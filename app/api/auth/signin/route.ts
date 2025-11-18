import { NextRequest, NextResponse } from 'next/server'
import { adminProtection } from '@/lib/arcjet'

export async function POST(request: NextRequest) {
  // Arcjet protection against attacks
  const decision = await adminProtection.protect(request, { requested: 1 })
  
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      )
    }
    
    return NextResponse.json(
      { error: 'Request blocked by security protection.' },
      { status: 403 }
    )
  }

  try {
    const body = await request.json()
    const { email, password } = body

    // Validate inputs (this is where Shield protects against SQLi/XSS)
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Input validation
    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input types' },
        { status: 400 }
      )
    }

    // Check for excessively long inputs
    if (email.length > 255 || password.length > 255) {
      return NextResponse.json(
        { error: 'Input too long' },
        { status: 400 }
      )
    }

    // This is a DEMO endpoint - always returns invalid credentials
    // Real authentication is handled by Clerk
    return NextResponse.json(
      { 
        error: 'Invalid credentials',
        message: 'This is a demo endpoint. Real authentication uses Clerk.',
        arcjetProtection: 'enabled',
        inputsReceived: {
          email: email.substring(0, 50), // Truncate for safety
          passwordLength: password.length
        }
      },
      { status: 401 }
    )

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}
