import { type NextRequest, NextResponse } from "next/server"

// Mock analytics data
const analyticsData = {
  overview: {
    totalUsers: 25847,
    activeUsers: 12456,
    totalCourses: 12,
    completionRate: 68.5,
    avgSessionTime: 42, // minutes
    revenue: 156780,
  },
  userGrowth: [
    { month: "Jan", users: 15000, active: 8500 },
    { month: "Feb", users: 18500, active: 10200 },
    { month: "Mar", users: 22100, active: 11800 },
    { month: "Apr", users: 25847, active: 12456 },
  ],
  coursePerformance: [
    { courseId: "foundation", title: "Foundation Track", enrolled: 15420, completed: 10537, rating: 4.8 },
    { courseId: "intermediate", title: "Control & Creativity", enrolled: 8945, completed: 5234, rating: 4.7 },
    { courseId: "advanced", title: "Optimization & Automation", enrolled: 3456, completed: 1789, rating: 4.9 },
  ],
  revenueData: [
    { month: "Jan", revenue: 125000, subscriptions: 2100 },
    { month: "Feb", revenue: 138000, subscriptions: 2350 },
    { month: "Mar", revenue: 145000, subscriptions: 2580 },
    { month: "Apr", revenue: 156780, subscriptions: 2847 },
  ],
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const timeframe = searchParams.get("timeframe") || "30d"
  const metric = searchParams.get("metric")

  if (metric) {
    return NextResponse.json({
      success: true,
      data: analyticsData[metric as keyof typeof analyticsData] || null,
    })
  }

  return NextResponse.json({
    success: true,
    data: analyticsData,
  })
}
