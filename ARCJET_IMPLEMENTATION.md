# Arcjet Security Implementation

## Overview
Successfully implemented Arcjet security layer following the official documentation at https://docs.arcjet.com/get-started?f=next-js

## Features Implemented

### 1. **Global Protection (Middleware)**
- **Location**: `proxy.ts`
- **Protection Level**: Shield + Bot Detection
- **Coverage**: All routes including admin and API routes
- **Features**:
  - Attack protection (SQL injection, XSS, etc.)
  - Bot detection and blocking
  - Runs before Clerk authentication

### 2. **API Route Protection**
Created three-tier protection system in `lib/arcjet.ts`:

#### General Protection (`aj`)
- **Rate Limit**: 10 requests/60 seconds
- **Capacity**: 20 tokens
- **Features**: Shield + Bot Detection + Token Bucket

#### API Protection (`apiProtection`)
- **Rate Limit**: 5 requests/60 seconds
- **Capacity**: 10 tokens
- **Use Case**: GET requests (read operations)
- **Applied To**:
  - `GET /api/projects`
  - `GET /api/projects/[id]`
  - `GET /api/experience`
  - `GET /api/experience/[id]`
  - `GET /api/skills`
  - `GET /api/skills/[id]`

#### Admin Protection (`adminProtection`)
- **Rate Limit**: 3 requests/60 seconds (very strict)
- **Capacity**: 5 tokens
- **Use Case**: POST/PUT/DELETE requests (mutations)
- **Applied To**:
  - `POST /api/projects`
  - `PUT /api/projects/[id]`
  - `DELETE /api/projects/[id]`
  - `POST /api/experience`
  - `PUT /api/experience/[id]`
  - `DELETE /api/experience/[id]`
  - `POST /api/skills`
  - `PUT /api/skills/[id]`
  - `DELETE /api/skills/[id]`

## Configuration

### Environment Variables
- `ARCJET_KEY`: Already configured in Vercel environment variables
- Automatically uses LIVE mode for production

### Rate Limiting Strategy
1. **Middleware**: Basic protection against attacks and bots
2. **API Routes (GET)**: Moderate limits for read operations
3. **Admin Routes (POST/PUT/DELETE)**: Strict limits for data modifications

## Protection Layers

### Layer 1: Middleware (proxy.ts)
```typescript
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE", allow: [] }),
  ],
})
```

### Layer 2: API Route Protection
```typescript
const decision = await apiProtection.protect(request, { requested: 1 })
if (decision.isDenied()) {
  return NextResponse.json({ error: "Too many requests..." }, { status: 429 })
}
```

### Layer 3: Clerk Authentication
Still enforced after Arcjet checks pass for admin routes.

## Response Codes

- **403 Forbidden**: Arcjet Shield or Bot Detection blocked the request
- **429 Too Many Requests**: Rate limit exceeded
- **401 Unauthorized**: Clerk authentication failed (after passing Arcjet)

## Testing

### Local Testing
1. Run `pnpm dev`
2. Visit admin routes and try to trigger rate limits
3. Make rapid API calls to test token bucket

### Production Monitoring
- View request logs at: https://app.arcjet.com
- Monitor bot detection and rate limit hits
- Check for false positives

## Benefits

1. **Bot Protection**: Blocks automated traffic trying to scrape or attack the portfolio
2. **Rate Limiting**: Prevents abuse of API endpoints
3. **Attack Prevention**: Shield protects against common web attacks
4. **Performance**: Arcjet caches decisions for better performance
5. **Fail Open**: If Arcjet is unavailable, requests still proceed

## Documentation References

- Official Arcjet Docs: https://docs.arcjet.com/get-started?f=next-js
- Next.js SDK Reference: https://docs.arcjet.com/reference/nextjs
- Clerk Integration: https://docs.arcjet.com/integrations/clerk

## Notes

- All protection rules are in **LIVE mode** (actively blocking)
- Bot detection allows **no bots** (deny all)
- Rate limits are IP-based by default
- Arcjet is fully compatible with Clerk authentication
- The middleware runs before Clerk, providing an extra security layer

## Deployment Status

✅ Committed to main branch
✅ Pushed to GitHub
✅ Auto-deployed to Vercel with ARCJET_KEY
✅ All API routes protected
✅ Middleware active globally
