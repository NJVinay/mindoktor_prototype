import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

export const zoneRoutes = Router();

const querySchema = z.object({
  zone: z.union([z.string(), z.array(z.string())]).optional(),
}).transform((data) => ({
  zone: Array.isArray(data.zone) ? data.zone[0] : data.zone,
}));

/**
 * GET /api/v1/zones/:zone/conditions
 * Get conditions by body zone.
 */
zoneRoutes.get('/:zone/conditions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { zone } = req.params;
    const zoneParam = Array.isArray(zone) ? zone[0] : zone;

    const conditions = await prisma.condition.findMany({
      where: {
        body_zones: { has: zoneParam },
      },
      include: {
        category: {
          select: { key: true, name_sv: true, name_en: true, icon_name: true, color_token: true },
        },
      },
      orderBy: { name_sv: 'asc' },
    });

    res.json({
      zone: zoneParam,
      data: conditions,
      count: conditions.length,
    });
  } catch (err) {
    next(err);
  }
});
