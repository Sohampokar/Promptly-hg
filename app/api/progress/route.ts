import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware/auth'
import { CourseService } from '@/lib/services/CourseService'
import { apiRateLimit } from '@/lib/middleware/rateLimit'
import { sanitizeInput } from '@/lib/middleware/validation'

export const GET = requireAuth(async (request: NextRequest) => {
  try {
    // Apply rate limiting
    const rateLimitResult = await apiRateLimit(request)
    if (rateLimitResult) return rateLimitResult

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')

    if (!courseId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Course ID is required'
        },
        { status: 400 }
      )
    }

    const result = await CourseService.getUserCourses((request as any).user._id)

    // Filter for specific course if requested
    if (courseId && result.success) {
      const courseProgress = result.data.find((p: any) => p.course._id.toString() === courseId)
      return NextResponse.json({
        success: true,
        data: courseProgress || null
      })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Get progress API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
})

export const POST = requireAuth(async (request: NextRequest) => {
  try {
    const body = await request.json()
    const sanitizedData = sanitizeInput(body)

    const { courseId, lessonId, action, ...progressData } = sanitizedData

    if (!courseId || !lessonId || !action) {
      return NextResponse.json(
        {
          success: false,
          error: 'Course ID, lesson ID, and action are required'
        },
        { status: 400 }
      )
    }

    const result = await CourseService.updateProgress(
      (request as any).user._id,
      courseId,
      lessonId,
      progressData
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('Update progress API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
})