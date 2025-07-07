"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@/contexts/WalletContext"

interface ValidatorSubmission {
  id: string
  userId: string
  user: {
    wallet: string
    name?: string
  }
  submissionType: string
  courseId?: string
  course?: {
    name: string
    rewardAmount: number
  }
  title: string
  description: string
  evidenceUrl?: string
  evidenceType?: string
  requestedFLB: number
  status: "PENDING" | "APPROVED" | "REJECTED" | "UNDER_REVIEW"
  submittedAt: Date
  reviewedAt?: Date
  reviewedBy?: string
  reviewerNotes?: string
  priority: "LOW" | "MEDIUM" | "HIGH"
}

interface ValidatorStats {
  totalReviewed: number
  approvalRate: number
  avgReviewTime: number
  pendingCount: number
  todayReviewed: number
}

interface ValidatorProfile {
  wallet: string
  name?: string
  role: "VALIDATOR" | "SENIOR_VALIDATOR" | "ADMIN"
  specializations: string[]
  totalReviewed: number
  approvalRate: number
  joinedAt: Date
  isActive: boolean
  reputation: number
}

export function useValidator() {
  const { user } = useWallet()
  const [submissions, setSubmissions] = useState<ValidatorSubmission[]>([])
  const [profile, setProfile] = useState<ValidatorProfile | null>(null)
  const [stats, setStats] = useState<ValidatorStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if user is a validator
  const isValidator = profile?.isActive && ["VALIDATOR", "SENIOR_VALIDATOR", "ADMIN"].includes(profile.role)

  // Fetch validator profile and stats
  const fetchProfile = async () => {
    if (!user?.wallet) return

    try {
      setLoading(true)
      const response = await fetch(`/api/validator/profile?wallet=${user.wallet}`)
      const data = await response.json()

      if (response.ok) {
        setProfile(data.profile)
        setStats(data.stats)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to fetch validator profile")
    } finally {
      setLoading(false)
    }
  }

  // Fetch submissions for review
  const fetchSubmissions = async (status?: string, limit = 50) => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (status) params.append("status", status)
      params.append("limit", limit.toString())

      const response = await fetch(`/api/validator/submissions?${params}`)
      const data = await response.json()

      if (response.ok) {
        setSubmissions(data.submissions)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to fetch submissions")
    } finally {
      setLoading(false)
    }
  }

  // Review a single submission
  const reviewSubmission = async (
    submissionId: string,
    decision: "APPROVED" | "REJECTED",
    notes?: string,
    adjustedFLB?: number,
  ) => {
    if (!user?.wallet) throw new Error("Wallet not connected")

    try {
      setLoading(true)
      const response = await fetch("/api/validator/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submissionId,
          validatorWallet: user.wallet,
          decision,
          notes,
          adjustedFLB,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Refresh submissions and stats
        await Promise.all([fetchSubmissions("PENDING"), fetchProfile()])
        return data.submission
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      setError(err.message || "Failed to review submission")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Batch review submissions
  const batchReview = async (submissionIds: string[], decision: "APPROVED" | "REJECTED", notes?: string) => {
    if (!user?.wallet) throw new Error("Wallet not connected")

    try {
      setLoading(true)
      const response = await fetch("/api/validator/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submissionIds,
          validatorWallet: user.wallet,
          decision,
          notes,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Refresh submissions and stats
        await Promise.all([fetchSubmissions("PENDING"), fetchProfile()])
        return data.reviewedCount
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      setError(err.message || "Failed to batch review")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Create a new submission (for users)
  const createSubmission = async (submissionData: {
    submissionType: string
    courseId?: string
    title: string
    description: string
    evidenceUrl?: string
    evidenceType?: string
    requestedFLB: number
  }) => {
    if (!user?.id) throw new Error("User not authenticated")

    try {
      setLoading(true)
      const response = await fetch("/api/validator/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          ...submissionData,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        return data.submission
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      setError(err.message || "Failed to create submission")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Get submissions by status with counts
  const getSubmissionCounts = () => {
    const counts = {
      pending: submissions.filter((s) => s.status === "PENDING").length,
      approved: submissions.filter((s) => s.status === "APPROVED").length,
      rejected: submissions.filter((s) => s.status === "REJECTED").length,
      underReview: submissions.filter((s) => s.status === "UNDER_REVIEW").length,
    }
    return counts
  }

  // Get submissions by priority
  const getSubmissionsByPriority = () => {
    return {
      high: submissions.filter((s) => s.priority === "HIGH" && s.status === "PENDING"),
      medium: submissions.filter((s) => s.priority === "MEDIUM" && s.status === "PENDING"),
      low: submissions.filter((s) => s.priority === "LOW" && s.status === "PENDING"),
    }
  }

  useEffect(() => {
    if (user?.wallet) {
      fetchProfile()
    }
  }, [user?.wallet])

  useEffect(() => {
    if (isValidator) {
      fetchSubmissions("PENDING")
    }
  }, [isValidator])

  return {
    submissions,
    profile,
    stats,
    loading,
    error,
    isValidator,
    fetchProfile,
    fetchSubmissions,
    reviewSubmission,
    batchReview,
    createSubmission,
    getSubmissionCounts,
    getSubmissionsByPriority,
    clearError: () => setError(null),
  }
}
