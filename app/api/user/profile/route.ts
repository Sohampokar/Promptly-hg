import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware/auth'
import { User } from '@/lib/database/models/User'
import { connectToDatabase } from '@/lib/database/connection'
import { sanitizeInput } from '@/lib/middleware/validation'

export const GET = requireAuth(async (request: NextRequest) => {
  try {
    await connectToDatabase()
    
    const user = await User.findById((request as any).user._id)
      .populate('learning.enrolledCourses', 'title slug difficulty stats.rating')
      .populate('learning.completedCourses', 'title slug difficulty stats.rating')

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found'
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('Get profile API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
})

export const PUT = requireAuth(async (request: NextRequest) => {
  try {
    await connectToDatabase()
    
    const body = await request.json()
    const sanitizedData = sanitizeInput(body)

    // Only allow updating certain fields
    const allowedFields = [
      'name',
      'profile.bio',
      'profile.location',
      'profile.website',
      'profile.socialLinks',
      'preferences.notifications',
      'preferences.theme',
      'preferences.language',
      'preferences.timezone'
    ]

    const updateData: any = {}
    for (const field of allowedFields) {
      if (field.includes('.')) {
        const [parent, child] = field.split('.')
        if (sanitizedData[parent] && sanitizedData[parent][child] !== undefined) {
          if (!updateData[parent]) updateData[parent] = {}
          updateData[parent][child] = sanitizedData[parent][child]
        }
      } else if (sanitizedData[field] !== undefined) {
        updateData[field] = sanitizedData[field]
      }
    }

    const user = await User.findByIdAndUpdate(
      (request as any).user._id,
      { $set: updateData },
      { new: true, runValidators: true }
    )

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found'
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: user,
      message: 'Profile updated successfully'
    })
  } catch (error) {
    console.error('Update profile API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
})