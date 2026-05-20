import { prisma } from '../lib/prisma.js';

// ─── Types ──────────────────────────────────────────────────────
interface TriageAnswers {
  q1_duration?: string;    // 'today' | 'few_days' | 'weeks' | 'months' | 'years'
  q2_location?: string;    // body zone / area
  q3_intensity?: string;   // 'mild' | 'moderate' | 'severe' | 'emergency'
  q4_history?: string;     // 'first_time' | 'recurring' | 'chronic'
  [key: string]: unknown;
}

interface TriageResult {
  is_emergency: boolean;
  emergency_message?: string;
  emergency_number?: string;
  category_key: string | null;
  top_conditions: string[];
  confidence: number;
  reasoning: string;
}

// ─── Location → Category mapping ───────────────────────────────
const ZONE_TO_CATEGORY: Record<string, string> = {
  'chest': 'respiratory-cold',
  'lungs': 'respiratory-cold',
  'throat': 'respiratory-cold',
  'nose': 'respiratory-cold',
  'eyes': 'respiratory-cold',
  'skin': 'skin-body',
  'face': 'skin-body',
  'back-skin': 'skin-body',
  'hands': 'skin-body',
  'arms': 'skin-body',
  'feet': 'skin-body',
  'nails': 'skin-body',
  'reproductive': 'womens-sexual',
  'genitals': 'womens-sexual',
  'urinary': 'womens-sexual',
  'head': 'chronic-internal',
  'back': 'chronic-internal',
  'spine': 'chronic-internal',
  'joints': 'chronic-internal',
  'knees': 'chronic-internal',
  'hips': 'chronic-internal',
  'abdomen': 'chronic-internal',
  'stomach': 'chronic-internal',
  'lower-abdomen': 'chronic-internal',
  'rectum': 'chronic-internal',
  'full-body': 'mental-lifestyle',
  'scalp': 'misc',
};

// ─── Duration classification ────────────────────────────────────
function isAcute(duration?: string): boolean {
  return ['today', 'few_days'].includes(duration ?? '');
}

function isChronic(duration?: string): boolean {
  return ['months', 'years'].includes(duration ?? '');
}

// ─── Main Triage Engine ─────────────────────────────────────────
export async function runTriage(answers: TriageAnswers): Promise<TriageResult> {
  // 1. Emergency check (q3 intensity)
  if (answers.q3_intensity === 'emergency') {
    return {
      is_emergency: true,
      emergency_message: 'Baserat på dina svar verkar detta vara ett akut tillstånd. Vänligen ring 112 omedelbart eller åk till närmaste akutmottagning.',
      emergency_number: '112',
      category_key: null,
      top_conditions: [],
      confidence: 1.0,
      reasoning: 'Emergency intensity detected — immediate medical attention recommended.',
    };
  }

  // 2. Map body zone to primary category
  const bodyZone = answers.q2_location ?? '';
  let primaryCategoryKey = ZONE_TO_CATEGORY[bodyZone] ?? null;

  // 3. Build confidence score
  let confidence = 0.5; // base

  if (!bodyZone) {
    confidence = 0.35;
  }

  // +0.2 if body_zone matches q2
  if (bodyZone && primaryCategoryKey) {
    confidence += 0.2;
  }

  // 4. Fetch conditions from the predicted category
  let conditions: Array<{ slug: string; typical_duration: string; severity_min: number; severity_max: number; tags: string[] }> = [];

  if (primaryCategoryKey) {
    const category = await prisma.category.findUnique({
      where: { key: primaryCategoryKey },
      include: {
        conditions: {
          select: { slug: true, typical_duration: true, severity_min: true, severity_max: true, tags: true },
        },
      },
    });
    conditions = category?.conditions ?? [];
  }

  // If no conditions found, fall back to all conditions
  if (conditions.length === 0) {
    conditions = await prisma.condition.findMany({
      select: { slug: true, typical_duration: true, severity_min: true, severity_max: true, tags: true },
      take: 10,
    });
    primaryCategoryKey = 'misc';
  }

  // 5. Score and rank conditions
  const scored = conditions.map((cond) => {
    let score = 0;

    // Duration matching: +0.15
    const dur = answers.q1_duration;
    if (dur) {
      if (isAcute(dur) && !cond.typical_duration.includes('chronic')) {
        score += 0.15;
      } else if (isChronic(dur) && (cond.typical_duration === 'chronic' || cond.typical_duration === 'varies')) {
        score += 0.15;
      }
    }

    // History consistency: +0.1
    if (answers.q4_history === 'chronic' && cond.typical_duration === 'chronic') {
      score += 0.1;
    } else if (answers.q4_history === 'first_time' && cond.typical_duration !== 'chronic') {
      score += 0.1;
    }

    // Intensity within severity range: +0.05
    const intensityMap: Record<string, number> = { 'mild': 2, 'moderate': 4, 'severe': 7 };
    const intensityScore = intensityMap[answers.q3_intensity ?? ''] ?? 3;
    if (intensityScore >= cond.severity_min && intensityScore <= cond.severity_max) {
      score += 0.05;
    }

    return { slug: cond.slug, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Add condition scoring to confidence
  const topScore = scored[0]?.score ?? 0;
  confidence += topScore;

  // Cap confidence at 0.95
  confidence = Math.min(confidence, 0.95);

  const topConditions = scored.slice(0, 3).map((s) => s.slug);

  // 6. Generate reasoning (STUB - mock GPT response)
  const categoryDisplayName = primaryCategoryKey?.replace(/-/g, ' ') ?? 'general health';
  const reasoning = `Based on your symptoms (location: ${bodyZone || 'unspecified'}, duration: ${answers.q1_duration ?? 'unknown'}, intensity: ${answers.q3_intensity ?? 'unknown'}), this appears to be a ${categoryDisplayName} issue. Top conditions identified: ${topConditions.join(', ')}.`;

  return {
    is_emergency: false,
    category_key: primaryCategoryKey,
    top_conditions: topConditions,
    confidence: Math.round(confidence * 100) / 100,
    reasoning,
  };
}

/**
 * STUB: GPT fallback for complex triage cases.
 * In production, this would call OpenAI GPT-4o.
 */
export async function gptTriageFallback(answers: TriageAnswers): Promise<TriageResult> {
  // Mock GPT response
  const bodyZone = answers.q2_location ?? '';
  const categoryKey = ZONE_TO_CATEGORY[bodyZone] ?? 'misc';

  const category = await prisma.category.findUnique({
    where: { key: categoryKey },
    include: {
      conditions: {
        select: { slug: true },
        take: 3,
      },
    },
  });

  return {
    is_emergency: false,
    category_key: categoryKey,
    top_conditions: category?.conditions.map((c) => c.slug) ?? [],
    confidence: 0.65,
    reasoning: `[GPT-STUB] Based on your symptoms, this appears to be a ${categoryKey.replace(/-/g, ' ')} issue. This is a mock response — in production, GPT-4o would provide detailed reasoning.`,
  };
}
