// Authentication utilities
import type { NextRequest } from "next/server"

export interface AuthUser {
  id: string
  email: string
  name: string
  role: "student" | "instructor" | "admin"
  subscription: "free" | "premium" | "enterprise"
}

export class AuthService {
  static async getCurrentUser(request: NextRequest): Promise<AuthUser | null> {
    // In production, verify JWT token or session
    const authHeader = request.headers.get("authorization")

    if (!authHeader) {
      return null
    }

    // Mock user for demo
    return {
      id: "user-123",
      email: "demo@example.com",
      name: "Demo User",
      role: "student",
      subscription: "premium",
    }
  }

  static async requireAuth(request: NextRequest): Promise<AuthUser> {
    const user = await this.getCurrentUser(request)

    if (!user) {
      throw new Error("Authentication required")
    }

    return user
  }

  static async requireRole(request: NextRequest, role: string): Promise<AuthUser> {
    const user = await this.requireAuth(request)

    if (user.role !== role) {
      throw new Error("Insufficient permissions")
    }

    return user
  }
}
