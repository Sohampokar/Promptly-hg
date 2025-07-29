import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/services/AuthService'
import { authRateLimit } from '@/lib/middleware/rateLimit'
import { sanitizeInput } from '@/lib/middleware/validation'

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await authRateLimit(request)
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const sanitizedData = sanitizeInput(body)

    const { email } = sanitizedData

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email is required'
        },
        { status: 400 }
      )
    }

    const result = await AuthService.forgotPassword(email)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Forgot password API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
}