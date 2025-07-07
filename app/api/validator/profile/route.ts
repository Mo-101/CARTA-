import { type NextRequest, NextResponse } from "next/server"
import { getValidatorProfile, createValidator, getValidatorStats } from "@/lib/validator"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const wallet = searchParams.get("wallet")

    if (!wallet) {
      return NextResponse.json({ error: "wallet parameter required" }, { status: 400 })
    }

    const profile = await getValidatorProfile(wallet)
    const stats = await getValidatorStats(wallet)

    return NextResponse.json({ profile, stats })
  } catch (error) {
    console.error("Error in validator profile GET:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { wallet, name, role, specializations } = body

    if (!wallet || !role || !specializations) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const validator = await createValidator({
      wallet,
      name,
      role,
      specializations,
    })

    return NextResponse.json({ success: true, validator })
  } catch (error) {
    console.error("Error in validator profile POST:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
