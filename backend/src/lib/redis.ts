import Redis from 'ioredis';

const REDIS_URL = process.env['REDIS_URL'] ?? 'redis://localhost:6379';

let redis: Redis | null = null;

try {
  redis = new Redis(REDIS_URL, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 3) {
        console.warn('⚠️ Redis connection failed, falling back to no-cache mode');
        return null; // stop retrying
      }
      return Math.min(times * 200, 2000);
    },
    lazyConnect: true,
  });

  redis.on('error', (err) => {
    console.warn('⚠️ Redis error:', err.message);
  });

  redis.on('connect', () => {
    console.log('✅ Redis connected');
  });

  // Attempt connection
  redis.connect().catch(() => {
    console.warn('⚠️ Redis unavailable, running without cache');
    redis = null;
  });
} catch {
  console.warn('⚠️ Redis initialization failed, running without cache');
  redis = null;
}

export function getRedis(): Redis | null {
  return redis;
}

export async function getCached(key: string): Promise<string | null> {
  const r = getRedis();
  if (!r) return null;
  try {
    return await r.get(key);
  } catch {
    return null;
  }
}

export async function setCache(key: string, value: string, ttlSeconds: number = 1800): Promise<void> {
  const r = getRedis();
  if (!r) return;
  try {
    await r.setex(key, ttlSeconds, value);
  } catch {
    // silently ignore cache failures
  }
}
