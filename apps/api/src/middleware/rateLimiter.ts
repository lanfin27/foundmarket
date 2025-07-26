import { Request, Response, NextFunction } from 'express'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

// Simple in-memory rate limiter
export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || 'unknown'
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 100

  // Clean up old entries
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  })

  if (!store[ip]) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs,
    }
    return next()
  }

  if (store[ip].resetTime < now) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs,
    }
    return next()
  }

  if (store[ip].count >= maxRequests) {
    return res.status(429).json({
      error: 'Too many requests',
      retryAfter: Math.ceil((store[ip].resetTime - now) / 1000),
    })
  }

  store[ip].count++
  next()
}