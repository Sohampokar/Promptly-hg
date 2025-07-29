import { type NextRequest, NextResponse } from "next/server"

// Mock user data
const users = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    role: "student",
    joinDate: "2024-01-15",
    lastActive: "2024-01-28",
    coursesEnrolled: 3,
    coursesCompleted: 1,
    totalXp: 2450,
    level: 5,
    subscription: "premium",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "student",
    joinDate: "2024-01-20",
    lastActive: "2024-01-29",
    coursesEnrolled: 2,
    coursesCompleted: 2,
    totalXp: 3200,
    level: 7,
    subscription: "free",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const search = searchParams.get("search")
  const role = searchParams.get("role")

  let filteredUsers = users

  if (search) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    )
  }

  if (role) {
    filteredUsers = filteredUsers.filter((user) => user.role === role)
  }

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  return NextResponse.json({
    success: true,
    data: paginatedUsers,
    pagination: {
      page,
      limit,
      total: filteredUsers.length,
      pages: Math.ceil(filteredUsers.length / limit),
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newUser = {
      id: `user-${Date.now()}`,
      ...body,
      joinDate: new Date().toISOString().split("T")[0],
      lastActive: new Date().toISOString().split("T")[0],
      coursesEnrolled: 0,
      coursesCompleted: 0,
      totalXp: 0,
      level: 1,
    }

    users.push(newUser)

    return NextResponse.json(
      {
        success: true,
        data: newUser,
        message: "User created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create user",
      },
      { status: 500 },
    )
  }
}
