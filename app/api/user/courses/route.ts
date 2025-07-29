import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware/auth'
import { CourseService } from '@/lib/services/CourseService'
import { apiRateLimit } from '@/lib/middleware/rateLimit'

export const GET = requireAuth(async (request: NextRequest) => {
  try {
    // Apply rate limiting
    const rateLimitResult = await apiRateLimit(request)
    if (rateLimitResult) return rateLimitResult

    const result = await CourseService.getUserCourses((request as any).user._id)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Get user courses API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
})