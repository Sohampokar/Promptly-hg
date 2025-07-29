import { NextRequest, NextResponse } from 'next/server'
import { CourseService } from '@/lib/services/CourseService'
import { requireAuth } from '@/lib/middleware/auth'
import { apiRateLimit } from '@/lib/middleware/rateLimit'

export const POST = requireAuth(async (
  request: NextRequest,
  { params }: { params: { courseId: string } }
) => {
  try {
    // Apply rate limiting
    const rateLimitResult = await apiRateLimit(request)
    if (rateLimitResult) return rateLimitResult

    const result = await CourseService.enrollInCourse(
      params.courseId,
      (request as any).user._id
    )

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Enroll course API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
})