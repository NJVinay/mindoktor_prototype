import { prisma } from '../lib/prisma.js';

interface MatchedDoctor {
  id: string;
  name: string;
  specialty: string;
  avg_rating: number;
  response_time_hours: number;
  avatar_url: string | null;
  is_available: boolean;
  languages: string[];
  match_score: number;
}

interface MatchCriteria {
  category_key?: string;
  body_zone?: string;
  condition_slug?: string;
}

/**
 * Match doctors based on:
 * 1. condition_tags overlap (highest priority)
 * 2. avg_rating DESC
 * 3. is_available
 *
 * Returns top 3 matches.
 */
export async function matchDoctors(criteria: MatchCriteria): Promise<MatchedDoctor[]> {
  // Gather target tags and zones from the criteria
  const targetTags: string[] = [];
  const targetZones: string[] = [];

  if (criteria.condition_slug) {
    const condition = await prisma.condition.findUnique({
      where: { slug: criteria.condition_slug },
      select: { tags: true, body_zones: true },
    });
    if (condition) {
      targetTags.push(...condition.tags);
      targetZones.push(...condition.body_zones);
    }
  }

  if (criteria.category_key) {
    // Add category-level tags
    const categoryTagMap: Record<string, string[]> = {
      'respiratory-cold': ['respiratory', 'cough', 'sinus', 'infection', 'eye'],
      'skin-body': ['skin', 'acne', 'eczema', 'rash', 'fungus', 'mole'],
      'womens-sexual': ['womens-health', 'pregnancy', 'sexual-health', 'sti', 'contraception'],
      'mental-lifestyle': ['mental-health', 'sleep', 'stress', 'burnout', 'lifestyle', 'addiction'],
      'chronic-internal': ['chronic', 'pain', 'joints', 'internal', 'stomach'],
      'childrens-health': ['children', 'respiratory', 'skin', 'infection'],
    };
    const catTags = categoryTagMap[criteria.category_key];
    if (catTags) {
      targetTags.push(...catTags);
    }
  }

  if (criteria.body_zone) {
    targetZones.push(criteria.body_zone);
  }

  // Fetch all doctors
  const doctors = await prisma.doctor.findMany();

  // Score and rank
  const scored = doctors.map((doc) => {
    let matchScore = 0;

    // Tag overlap score (weighted most heavily)
    if (targetTags.length > 0) {
      const tagOverlap = doc.condition_tags.filter((t) => targetTags.includes(t)).length;
      matchScore += tagOverlap * 3;
    }

    // Body zone overlap
    if (targetZones.length > 0) {
      const zoneOverlap = doc.body_zones.filter((z) => targetZones.includes(z)).length;
      matchScore += zoneOverlap * 2;
    }

    // Rating bonus
    matchScore += doc.avg_rating;

    // Availability bonus
    if (doc.is_available) {
      matchScore += 5;
    }

    // Faster response time bonus
    matchScore += (5 - doc.response_time_hours);

    return {
      id: doc.id,
      name: doc.name,
      specialty: doc.specialty,
      avg_rating: doc.avg_rating,
      response_time_hours: doc.response_time_hours,
      avatar_url: doc.avatar_url,
      is_available: doc.is_available,
      languages: doc.languages,
      match_score: Math.round(matchScore * 100) / 100,
    };
  });

  // Sort by match_score DESC, then rating DESC
  scored.sort((a, b) => {
    if (b.match_score !== a.match_score) return b.match_score - a.match_score;
    return b.avg_rating - a.avg_rating;
  });

  return scored.slice(0, 3);
}
