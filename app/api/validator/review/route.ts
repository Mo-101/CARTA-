import { type NextRequest, NextResponse } from "next/server"
import { reviewSubmission, batchReviewSubmissions } from "@/lib/validator"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { submissionId, submissionIds, validatorWallet, decision, notes, adjustedFLB } = body

    if (!validatorWallet || !decision) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!["APPROVED", "REJECTED"].includes(decision)) {
      return NextResponse.json({ error: "Invalid decision" }, { status: 400 })
    }

    // Handle batch review
    if (submissionIds && Array.isArray(submissionIds)) {
      const successCount = await batchReviewSubmissions(submissionIds, validatorWallet, decision, notes)
      return NextResponse.json({ success: true, reviewedCount: successCount })
    }

    // Handle single review
    if (!submissionId) {
      return NextResponse.json({ error: "submissionId or submissionIds required" }, { status: 400 })
    }

    const submission = await reviewSubmission(
      submissionId,
      validatorWallet,
      decision,
      notes,
      adjustedFLB ? Number.parseFloat(adjustedFLB) : undefined,
    )

    return NextResponse.json({ success: true, submission })
  } catch (error) {
    console.error("Error in validator review POST:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
