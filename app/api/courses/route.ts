import { NextRequest, NextResponse } from 'next/server'
import { CourseService } from '@/lib/services/CourseService'
import { requireAuth, requireRole } from '@/lib/middleware/auth'
import { apiRateLimit } from '@/lib/middleware/rateLimit'
import { sanitizeInput } from '@/lib/middleware/validation'

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await apiRateLimit(request)
    if (rateLimitResult) return rateLimitResult

    const { searchParams } = new URL(request.url)
    
    const filters = {
      difficulty: searchParams.get('difficulty') || undefined,
      category: searchParams.get('category') || undefined,
      tags: searchParams.get('tags')?.split(',') || undefined,
      search: searchParams.get('search') || undefined,
      instructor: searchParams.get('instructor') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      sortBy: (searchParams.get('sortBy') as any) || 'newest'
    }

    const result = await CourseService.getAllCourses(filters)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Get courses API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
}

export const POST = requireRole(['instructor', 'admin'])(async (request: NextRequest) => {
  try {
    const body = await request.json()
    const sanitizedData = sanitizeInput(body)

    // Validate required fields
    const requiredFields = ['title', 'description', 'difficulty', 'category']
    for (const field of requiredFields) {
      if (!sanitizedData[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `${field} is required`
          },
          { status: 400 }
        )
      }
    }

    const result = await CourseService.createCourse(sanitizedData, (request as any).user._id)

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Create course API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
})