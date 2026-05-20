import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';
import { AppError } from '../middleware/errorHandler.js';

export const categoryRoutes = Router();

/**
 * GET /api/v1/categories
 * Returns all categories with condition counts.
 */
categoryRoutes.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { sort_order: 'asc' },
      include: {
        _count: {
          select: { conditions: true },
        },
      },
    });

    const result = categories.map((cat) => ({
      id: cat.id,
      key: cat.key,
      name_sv: cat.name_sv,
      name_en: cat.name_en,
      icon_name: cat.icon_name,
      color_token: cat.color_token,
      sort_order: cat.sort_order,
      is_misc: cat.is_misc,
      condition_count: cat._count.conditions,
    }));

    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/categories/:key/conditions
 * Returns all conditions in a category.
 */
categoryRoutes.get('/:key/conditions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key } = req.params;

    const category = await prisma.category.findUnique({
      where: { key },
      include: {
        conditions: {
          orderBy: { name_sv: 'asc' },
        },
      },
    });

    if (!category) {
      throw new AppError(404, `Category "${key}" not found`);
    }

    res.json({
      category: {
        id: category.id,
        key: category.key,
        name_sv: category.name_sv,
        name_en: category.name_en,
        icon_name: category.icon_name,
        color_token: category.color_token,
      },
      data: category.conditions,
    });
  } catch (err) {
    next(err);
  }
});
