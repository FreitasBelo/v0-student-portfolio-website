import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/next"

// Main Arcjet instance with comprehensive protection
export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // Shield protects against common attacks (SQL injection, XSS, etc.)
    shield({
      mode: "LIVE",
    }),
    // Bot detection
    detectBot({
      mode: "LIVE",
      allow: [], // Block all bots by default
    }),
    // Token bucket for rate limiting
    tokenBucket({
      mode: "LIVE",
      refillRate: 10, // Refill 10 tokens per interval
      interval: 60, // 60 seconds
      capacity: 20, // Maximum 20 tokens
    }),
  ],
})

// Stricter rate limiting for API routes
export const apiProtection = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE", allow: [] }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // More restrictive for API
      interval: 60,
      capacity: 10,
    }),
  ],
})

// Admin route protection with very strict limits
export const adminProtection = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE", allow: [] }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 3, // Very strict for admin actions
      interval: 60,
      capacity: 5,
    }),
  ],
})
