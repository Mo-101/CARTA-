import { type NextRequest, NextResponse } from "next/server"
import { recordYouthAction, getYouthActions } from "@/lib/youth-rewards"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, actionType, flbAmount, verifiedBy, courseId, description } = body

    if (!userId || !actionType || !flbAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const action = await recordYouthAction({
      userId,
      actionType,
      flbAmount: Number.parseFloat(flbAmount),
      verifiedBy,
      courseId,
      description,
    })

    return NextResponse.json({ success: true, action })
  } catch (error) {
    console.error("Error in youth-actions POST:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    const actions = await getYouthActions(userId, limit)

    return NextResponse.json({ actions })
  } catch (error) {
    console.error("Error in youth-actions GET:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
