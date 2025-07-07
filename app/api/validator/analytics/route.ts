import { type NextRequest, NextResponse } from "next/server"
import { getValidatorAnalytics } from "@/lib/validator"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = (searchParams.get("timeframe") as "day" | "week" | "month") || "week"

    const analytics = await getValidatorAnalytics(timeframe)

    return NextResponse.json({ analytics })
  } catch (error) {
    console.error("Error in validator analytics GET:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
