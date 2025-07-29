import { NextRequest, NextResponse } from 'next/server'
import { JWTService } from '../auth/jwt'
import { User } from '../database/models/User'
import { connectToDatabase } from '../database/connection'

export interface AuthenticatedRequest extends NextRequest {
  user?: any
}

export async function authenticateUser(request: NextRequest): Promise<any> {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('No valid authorization header')
    }

    const token = authHeader.substring(7)
    const payload = JWTService.verifyToken(token)

    await connectToDatabase()
    const user = await User.findById(payload.userId).select('-password')

    if (!user) {
      throw new Error('User not found')
    }

    if (user.security.lockUntil && user.security.lockUntil > new Date()) {
      throw new Error('Account is locked')
    }

    return user
  } catch (error) {
    throw new Error('Authentication failed')
  }
}

export function requireAuth(handler: Function) {
  return async (request: NextRequest, context?: any) => {
    try {
      const user = await authenticateUser(request)
      
      // Add user to request context
      const authenticatedRequest = request as AuthenticatedRequest
      authenticatedRequest.user = user

      return handler(authenticatedRequest, context)
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }
  }
}

export function requireRole(roles: string[]) {
  return function(handler: Function) {
    return async (request: NextRequest, context?: any) => {
      try {
        const user = await authenticateUser(request)
        
        if (!roles.includes(user.role)) {
          return NextResponse.json(
            { success: false, error: 'Insufficient permissions' },
            { status: 403 }
          )
        }

        const authenticatedRequest = request as AuthenticatedRequest
        authenticatedRequest.user = user

        return handler(authenticatedRequest, context)
      } catch (error) {
        return NextResponse.json(
          { success: false, error: 'Authentication required' },
          { status: 401 }
        )
      }
    }
  }
}