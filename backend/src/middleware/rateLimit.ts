import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

/**
 * Simple in-memory rate limiter.
 * For production use Redis-backed rate limiting.
 */
export function rateLimit(maxRequests: number = 60, windowMs: number = 60_000) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip ?? req.socket.remoteAddress ?? 'unknown';
    const now = Date.now();

    const entry = store[ip];
    if (!entry || now > entry.resetTime) {
      store[ip] = { count: 1, resetTime: now + windowMs };
      next();
      return;
    }

    if (entry.count >= maxRequests) {
      res.status(429).json({
        error: 'Too many requests',
        retry_after_seconds: Math.ceil((entry.resetTime - now) / 1000),
      });
      return;
    }

    entry.count++;
    next();
  };
}
