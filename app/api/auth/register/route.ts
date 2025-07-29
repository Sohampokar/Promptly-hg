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

    // Validate required fields
    const { email, password, name, role } = sanitizedData

    if (!email || !password || !name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email, password, and name are required'
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide a valid email address'
        },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          error: 'Password must be at least 8 characters long'
        },
        { status: 400 }
      )
    }

    const result = await AuthService.register({
      email,
      password,
      name,
      role: role || 'student'
    })

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    const response = NextResponse.json(result, { status: 201 })

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
    console.error('Register API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
}