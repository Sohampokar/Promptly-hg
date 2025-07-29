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

    const { email, password } = sanitizedData

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email and password are required'
        },
        { status: 400 }
      )
    }

    const result = await AuthService.login({ email, password })

    if (!result.success) {
      return NextResponse.json(result, { status: 401 })
    }

    const response = NextResponse.json(result)

    // Set HTTP-only cookie for refresh token
    if (result.refreshToken) {
      response.cookies.set('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      })
    }

    return response
  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
}