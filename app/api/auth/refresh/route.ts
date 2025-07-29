import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/services/AuthService'

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value

    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'Refresh token not found'
        },
        { status: 401 }
      )
    }

    const result = await AuthService.refreshToken(refreshToken)

    if (!result.success) {
      const response = NextResponse.json(result, { status: 401 })
      response.cookies.delete('refreshToken')
      return response
    }

    const response = NextResponse.json(result)

    // Set new refresh token
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
    console.error('Refresh token API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
}