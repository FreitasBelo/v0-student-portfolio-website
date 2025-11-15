import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import arcjet, { detectBot, shield } from '@arcjet/next'

const isProtectedRoute = createRouteMatcher(['/admin(.*)'])

// Configure Arcjet
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // Shield protects against common attacks
    shield({
      mode: "LIVE",
    }),
    // Detect and block bots
    detectBot({
      mode: "LIVE",
      allow: [], // Deny all bots
    }),
  ],
})

export default clerkMiddleware(async (auth, req) => {
  // Run Arcjet protection first
  const decision = await aj.protect(req)
  
  if (decision.isDenied()) {
    return new Response("Forbidden", { status: 403 })
  }

  // Then check Clerk authentication for protected routes
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
