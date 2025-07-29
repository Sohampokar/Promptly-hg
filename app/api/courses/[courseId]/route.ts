import { NextRequest, NextResponse } from 'next/server'
import { CourseService } from '@/lib/services/CourseService'
import { requireAuth } from '@/lib/middleware/auth'
import { apiRateLimit } from '@/lib/middleware/rateLimit'
import { sanitizeInput } from '@/lib/middleware/validation'

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    // Apply rate limiting
    const rateLimitResult = await apiRateLimit(request)
    if (rateLimitResult) return rateLimitResult

    // Try to get user from auth header (optional for public courses)
    let userId: string | undefined
    try {
      const authHeader = request.headers.get('authorization')
      if (authHeader) {
        const user = await require('@/lib/middleware/auth').authenticateUser(request)
        userId = user._id
      }
    } catch (error) {
      // Ignore auth errors for public access
    }

    const result = await CourseService.getCourseById(params.courseId, userId)

    if (!result.success) {
      return NextResponse.json(result, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Get course API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
}

export const PUT = requireAuth(async (
  request: NextRequest,
  { params }: { params: { courseId: string } }
) => {
  try {
    const body = await request.json()
    const sanitizedData = sanitizeInput(body)

    const result = await CourseService.updateCourse(
      params.courseId,
      sanitizedData,
      (request as any).user._id
    )

    if (!result.success) {
      return NextResponse.json(result, { status: result.error === 'Course not found or unauthorized' ? 404 : 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Update course API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
})