import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { matchDoctors } from '../services/doctorMatcher.js';

export const doctorRoutes = Router();

const matchQuerySchema = z.object({
  category_key: z.string().optional(),
  body_zone: z.string().optional(),
  condition_slug: z.string().optional(),
});

/**
 * GET /api/v1/doctors/match?category_key=&body_zone=&condition_slug=
 * Match doctors based on criteria.
 */
doctorRoutes.get('/match', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = matchQuerySchema.parse(req.query);

    const doctors = await matchDoctors({
      category_key: query.category_key,
      body_zone: query.body_zone,
      condition_slug: query.condition_slug,
    });

    res.json({ data: doctors, count: doctors.length });
  } catch (err) {
    next(err);
  }
});
