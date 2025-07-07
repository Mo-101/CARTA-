import { type NextRequest, NextResponse } from "next/server"
import { getSubmissions, createSubmission } from "@/lib/validator"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") as any
    const validatorWallet = searchParams.get("validator")
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    const submissions = await getSubmissions(status, validatorWallet || undefined, limit)

    return NextResponse.json({ submissions })
  } catch (error) {
    console.error("Error in validator submissions GET:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, submissionType, courseId, title, description, evidenceUrl, evidenceType, requestedFLB } = body

    if (!userId || !submissionType || !title || !description || !requestedFLB) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const submission = await createSubmission({
      userId,
      submissionType,
      courseId,
      title,
      description,
      evidenceUrl,
      evidenceType,
      requestedFLB: Number.parseFloat(requestedFLB),
    })

    return NextResponse.json({ success: true, submission })
  } catch (error) {
    console.error("Error in validator submissions POST:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
