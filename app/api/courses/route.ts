import { type NextRequest, NextResponse } from "next/server"
import { getCourses, createCourse } from "@/lib/youth-rewards"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get("language")
    const difficulty = searchParams.get("difficulty")

    const courses = await getCourses(language || undefined, difficulty || undefined)

    return NextResponse.json({ courses })
  } catch (error) {
    console.error("Error in courses GET:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      rewardAmount,
      active = true,
      contentHash,
      language = "en",
      duration,
      difficulty = "beginner",
    } = body

    if (!name || !description || !rewardAmount || !duration) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const course = await createCourse({
      name,
      description,
      rewardAmount: Number.parseFloat(rewardAmount),
      active,
      contentHash,
      language,
      duration: Number.parseInt(duration),
      difficulty,
    })

    return NextResponse.json({ success: true, course })
  } catch (error) {
    console.error("Error in courses POST:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
