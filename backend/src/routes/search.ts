import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { autocompleteSearch } from '../services/searchService.js';

export const searchRoutes = Router();

const searchQuerySchema = z.object({
  q: z.string().min(1, 'Search query is required'),
  lang: z.enum(['sv', 'en']).default('sv'),
  limit: z.coerce.number().int().min(1).max(20).default(5),
});

/**
 * GET /api/v1/search?q={term}&lang={sv|en}&limit={5}
 * Autocomplete search for conditions.
 */
searchRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = searchQuerySchema.parse(req.query);

    const results = await autocompleteSearch(query.q, query.lang, query.limit);

    res.json({
      query: query.q,
      lang: query.lang,
      data: results,
      count: results.length,
    });
  } catch (err) {
    next(err);
  }
});
