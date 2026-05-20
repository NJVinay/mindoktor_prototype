import { prisma } from '../lib/prisma.js';
import { getCached, setCache } from '../lib/redis.js';
import { Prisma } from '@prisma/client';

interface SearchResult {
  slug: string;
  name_sv: string;
  name_en: string;
  category_key: string;
  match_score: number;
}

/**
 * Autocomplete search using pg_trgm similarity.
 * Results are cached in Redis for 30 minutes.
 */
export async function autocompleteSearch(
  query: string,
  lang: string = 'sv',
  limit: number = 5,
): Promise<SearchResult[]> {
  if (!query || query.length < 2) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const cacheKey = `search:${lang}:${normalizedQuery}:${limit}`;

  // Check Redis cache
  const cached = await getCached(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached) as SearchResult[];
    } catch {
      // ignore parse errors
    }
  }

  // Use pg_trgm similarity search via raw query
  try {
    const results = await prisma.$queryRaw<
      Array<{
        slug: string;
        name_sv: string;
        name_en: string;
        category_key: string;
        similarity: number;
      }>
    >(
      Prisma.sql`
        SELECT DISTINCT ON (c.slug)
          c.slug,
          c.name_sv,
          c.name_en,
          cat.key AS category_key,
          similarity(si.term, ${normalizedQuery}) AS similarity
        FROM search_index si
        JOIN conditions c ON c.id = si.condition_id
        JOIN categories cat ON cat.id = c.category_id
        WHERE si.lang = ${lang}
          AND similarity(si.term, ${normalizedQuery}) > 0.1
        ORDER BY c.slug, similarity(si.term, ${normalizedQuery}) DESC
      `,
    );

    // Sort by similarity descending and limit
    const sorted = results
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map((r) => ({
        slug: r.slug,
        name_sv: r.name_sv,
        name_en: r.name_en,
        category_key: r.category_key,
        match_score: Math.round(r.similarity * 100) / 100,
      }));

    // Cache for 30 minutes
    await setCache(cacheKey, JSON.stringify(sorted), 1800);

    return sorted;
  } catch (error) {
    // Fallback: simple ILIKE search if pg_trgm is not available
    console.warn('⚠️ pg_trgm search failed, falling back to ILIKE:', error);
    return fallbackSearch(normalizedQuery, lang, limit);
  }
}

/**
 * Fallback search using simple ILIKE pattern matching.
 */
async function fallbackSearch(
  query: string,
  lang: string,
  limit: number,
): Promise<SearchResult[]> {
  const searchIndexResults = await prisma.searchIndex.findMany({
    where: {
      lang,
      term: {
        contains: query,
        mode: 'insensitive',
      },
    },
    include: {
      condition: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      weight: 'desc',
    },
    take: limit * 3, // over-fetch to deduplicate
  });

  // Deduplicate by condition slug
  const seen = new Set<string>();
  const results: SearchResult[] = [];

  for (const entry of searchIndexResults) {
    if (seen.has(entry.condition.slug)) continue;
    seen.add(entry.condition.slug);

    results.push({
      slug: entry.condition.slug,
      name_sv: entry.condition.name_sv,
      name_en: entry.condition.name_en,
      category_key: entry.condition.category.key,
      match_score: entry.weight,
    });

    if (results.length >= limit) break;
  }

  return results;
}
