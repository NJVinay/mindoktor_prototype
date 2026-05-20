import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { AppError } from '../middleware/errorHandler.js';

export const conditionRoutes = Router();

const querySchema = z.object({
  category: z.string().optional(),
  zone: z.string().optional(),
  layer: z.string().optional(),
  tag: z.string().optional(),
  q: z.string().optional(),
});

/**
 * GET /api/v1/conditions
 * Filterable list of conditions.
 * Query params: category, zone, tag, q
 */
conditionRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = querySchema.parse(req.query);

    const where: any = {};

    if (query.category) {
      const category = await prisma.category.findUnique({ where: { key: query.category } });
      if (category) {
        where.category_id = category.id;
      }
    }

    if (query.zone) {
      where.body_zones = { has: query.zone };
    }

    if (query.layer) {
      where.layers = { has: query.layer };
    }

    if (query.tag) {
      where.tags = { has: query.tag };
    }

    if (query.q) {
      where.OR = [
        { name_sv: { contains: query.q, mode: 'insensitive' } },
        { name_en: { contains: query.q, mode: 'insensitive' } },
        { slug: { contains: query.q, mode: 'insensitive' } },
      ];
    }

    const conditions = await prisma.condition.findMany({
      where,
      include: {
        category: {
          select: { key: true, name_sv: true, name_en: true, icon_name: true, color_token: true },
        },
      },
      orderBy: { name_sv: 'asc' },
    });

    res.json({ data: conditions, count: conditions.length });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/conditions/layers
 * Returns layer counts for a specific body zone.
 * Query params: zone
 */
conditionRoutes.get('/layers', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { zone } = req.query;
    if (!zone || typeof zone !== 'string') {
      throw new AppError(400, 'zone query parameter is required');
    }

    // Find all conditions for this zone
    const conditions = await prisma.condition.findMany({
      where: { body_zones: { has: zone } },
      select: { layers: true },
    });

    // Count occurrences of each layer
    const layerCounts: Record<string, number> = {
      skin: 0,
      muscle: 0,
      bone: 0,
      nerve: 0,
      organ: 0,
    };

    conditions.forEach((c) => {
      c.layers.forEach((layer) => {
        if (layerCounts[layer] !== undefined) {
          layerCounts[layer]++;
        } else {
          layerCounts[layer] = 1;
        }
      });
    });

    // Filter out layers with 0 conditions
    const availableLayers = Object.entries(layerCounts)
      .filter(([_, count]) => count > 0)
      .map(([layer, count]) => ({ layer, count }));

    res.json({ data: availableLayers });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/conditions/:slug
 * Single condition with related conditions from the same category.
 */
conditionRoutes.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const condition = await prisma.condition.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!condition) {
      throw new AppError(404, `Condition "${slug}" not found`);
    }

    // Get related conditions from same category (excluding current)
    const related = await prisma.condition.findMany({
      where: {
        category_id: condition.category_id,
        id: { not: condition.id },
      },
      select: {
        slug: true,
        name_sv: true,
        name_en: true,
        body_zones: true,
        severity_min: true,
        severity_max: true,
      },
      take: 5,
    });

    res.json({ data: condition, related });
  } catch (err) {
    next(err);
  }
});
