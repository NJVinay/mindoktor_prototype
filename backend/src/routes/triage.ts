import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../lib/prisma.js';
import { AppError } from '../middleware/errorHandler.js';
import { rateLimit } from '../middleware/rateLimit.js';
import { runTriage } from '../services/triageEngine.js';
import { matchDoctors } from '../services/doctorMatcher.js';

export const triageRoutes = Router();

// Rate limit: 60 requests per minute for triage endpoints
triageRoutes.use(rateLimit(60, 60_000));

const answerSchema = z.object({
  question_id: z.string(),
  value: z.unknown(),
});

/**
 * POST /api/v1/triage/session
 * Create a new triage session and return a session token.
 */
triageRoutes.post('/session', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = uuidv4();

    const session = await prisma.triageSession.create({
      data: {
        session_token: sessionToken,
        answers: {},
      },
    });

    res.status(201).json({
      session_token: session.session_token,
      id: session.id,
      created_at: session.created_at,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/v1/triage/session/:token/answer
 * Upsert an answer to the triage session.
 */
triageRoutes.put('/session/:token/answer', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params;
    const body = answerSchema.parse(req.body);

    const session = await prisma.triageSession.findUnique({
      where: { session_token: token },
    });

    if (!session) {
      throw new AppError(404, `Session "${token}" not found`);
    }

    if (session.completed_at) {
      throw new AppError(400, 'Session has already been completed');
    }

    // Merge the new answer into existing answers
    const existingAnswers = (session.answers as Record<string, unknown>) ?? {};
    const updatedAnswers = {
      ...existingAnswers,
      [body.question_id]: body.value,
    };

    const updated = await prisma.triageSession.update({
      where: { session_token: token },
      data: {
        answers: updatedAnswers as any,
        body_zone: typeof updatedAnswers['q2_location'] === 'string' ? (updatedAnswers['q2_location'] as string) : session.body_zone,
      },
    });

    res.json({
      session_token: updated.session_token,
      answers: updated.answers,
      body_zone: updated.body_zone,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/triage/session/:token/resolve
 * Run triage engine and doctor matching on the session.
 */
triageRoutes.post('/session/:token/resolve', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params;

    const session = await prisma.triageSession.findUnique({
      where: { session_token: token },
    });

    if (!session) {
      throw new AppError(404, `Session "${token}" not found`);
    }

    const answers = session.answers as Record<string, unknown>;

    // Run the triage engine
    const triageResult = await runTriage(answers as any);

    // If emergency, return immediately
    if (triageResult.is_emergency) {
      const updated = await prisma.triageSession.update({
        where: { session_token: token },
        data: {
          predicted_conditions: [],
          confidence_score: 1.0,
          gpt_reasoning: triageResult.reasoning,
          completed_at: new Date(),
        },
      });

      res.json({
        session: updated,
        triage: triageResult,
        doctor: null,
      });
      return;
    }

    // Find the predicted category
    let categoryId: string | null = null;
    if (triageResult.category_key) {
      const category = await prisma.category.findUnique({
        where: { key: triageResult.category_key },
      });
      categoryId = category?.id ?? null;
    }

    // Match doctors
    const doctors = await matchDoctors({
      category_key: triageResult.category_key ?? undefined,
      body_zone: session.body_zone ?? undefined,
      condition_slug: triageResult.top_conditions[0],
    });

    const topDoctor = doctors[0];

    // Update session with results
    const updated = await prisma.triageSession.update({
      where: { session_token: token },
      data: {
        predicted_category_id: categoryId,
        predicted_conditions: triageResult.top_conditions,
        confidence_score: triageResult.confidence,
        gpt_reasoning: triageResult.reasoning,
        recommended_doctor_id: topDoctor?.id ?? null,
        completed_at: new Date(),
      },
      include: {
        predicted_category: true,
        recommended_doctor: true,
      },
    });

    res.json({
      session: updated,
      triage: triageResult,
      doctors,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/triage/session/:token
 * Get session with results.
 */
triageRoutes.get('/session/:token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params;

    const session = await prisma.triageSession.findUnique({
      where: { session_token: token },
      include: {
        predicted_category: true,
        recommended_doctor: true,
      },
    });

    if (!session) {
      throw new AppError(404, `Session "${token}" not found`);
    }

    res.json({ data: session });
  } catch (err) {
    next(err);
  }
});
