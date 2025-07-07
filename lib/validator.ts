"use server"

export interface ValidatorSubmission {
  id: string
  userId: string
  user: {
    wallet: string
    name?: string
  }
  submissionType: "COURSE_COMPLETION" | "PEER_REVIEW" | "PROJECT_SUBMISSION" | "COMMUNITY_ACTION"
  courseId?: string
  course?: {
    name: string
    rewardAmount: number
  }
  title: string
  description: string
  evidenceUrl?: string
  evidenceType?: "VIDEO" | "IMAGE" | "DOCUMENT" | "LINK"
  requestedFLB: number
  status: "PENDING" | "APPROVED" | "REJECTED" | "UNDER_REVIEW"
  submittedAt: Date
  reviewedAt?: Date
  reviewedBy?: string
  reviewerNotes?: string
  priority: "LOW" | "MEDIUM" | "HIGH"
}

export interface ValidatorStats {
  totalReviewed: number
  approvalRate: number
  avgReviewTime: number
  pendingCount: number
  todayReviewed: number
}

export interface ValidatorProfile {
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

// Mock data for preview
const mockSubmissions: ValidatorSubmission[] = [
  {
    id: "sub_1",
    userId: "user_1",
    user: { wallet: "0x1234...5678", name: "Alice" },
    submissionType: "COURSE_COMPLETION",
    courseId: "course_1",
    course: { name: "Malaria Prevention", rewardAmount: 50 },
    title: "Malaria Prevention Course Completion",
    description: "Completed all modules and passed final assessment",
    requestedFLB: 50,
    status: "PENDING",
    submittedAt: new Date(Date.now() - 3600000),
    priority: "HIGH",
  },
  {
    id: "sub_2",
    userId: "user_2",
    user: { wallet: "0x2345...6789", name: "Bob" },
    submissionType: "PROJECT_SUBMISSION",
    title: "Community Health Project",
    description: "Organized health awareness campaign in local community",
    requestedFLB: 150,
    status: "PENDING",
    submittedAt: new Date(Date.now() - 7200000),
    priority: "MEDIUM",
  },
]

const mockValidatorProfile: ValidatorProfile = {
  wallet: "0xvalidator123",
  name: "Dr. Sarah Johnson",
  role: "SENIOR_VALIDATOR",
  specializations: ["Health Education", "Community Health", "Disease Prevention"],
  totalReviewed: 1234,
  approvalRate: 87.3,
  joinedAt: new Date(Date.now() - 86400000 * 30),
  isActive: true,
  reputation: 950,
}

// Submission Management
export async function createSubmission(submissionData: {
  userId: string
  submissionType: ValidatorSubmission["submissionType"]
  courseId?: string
  title: string
  description: string
  evidenceUrl?: string
  evidenceType?: ValidatorSubmission["evidenceType"]
  requestedFLB: number
}): Promise<ValidatorSubmission> {
  try {
    const submission: ValidatorSubmission = {
      id: `sub_${Date.now()}`,
      user: { wallet: `0x${submissionData.userId}`, name: "User" },
      status: "PENDING",
      priority: submissionData.requestedFLB > 100 ? "HIGH" : submissionData.requestedFLB > 50 ? "MEDIUM" : "LOW",
      submittedAt: new Date(),
      ...submissionData,
    }

    return submission
  } catch (error) {
    console.error("Error creating submission:", error)
    throw new Error("Failed to create submission")
  }
}

export async function getSubmissions(
  status?: ValidatorSubmission["status"],
  validatorWallet?: string,
  limit = 50,
): Promise<ValidatorSubmission[]> {
  try {
    let submissions = [...mockSubmissions]

    if (status) {
      submissions = submissions.filter((sub) => sub.status === status)
    }
    if (validatorWallet) {
      submissions = submissions.filter((sub) => sub.reviewedBy === validatorWallet)
    }

    return submissions.slice(0, limit)
  } catch (error) {
    console.error("Error fetching submissions:", error)
    throw new Error("Failed to fetch submissions")
  }
}

export async function reviewSubmission(
  submissionId: string,
  validatorWallet: string,
  decision: "APPROVED" | "REJECTED",
  notes?: string,
  adjustedFLB?: number,
): Promise<ValidatorSubmission> {
  try {
    const submission = mockSubmissions.find((sub) => sub.id === submissionId)
    if (!submission) {
      throw new Error("Submission not found")
    }

    // Mock update
    const updatedSubmission: ValidatorSubmission = {
      ...submission,
      status: decision,
      reviewedBy: validatorWallet,
      reviewedAt: new Date(),
      reviewerNotes: notes,
    }

    return updatedSubmission
  } catch (error) {
    console.error("Error reviewing submission:", error)
    throw new Error("Failed to review submission")
  }
}

export async function batchReviewSubmissions(
  submissionIds: string[],
  validatorWallet: string,
  decision: "APPROVED" | "REJECTED",
  notes?: string,
): Promise<number> {
  try {
    // Mock batch review
    return submissionIds.length
  } catch (error) {
    console.error("Error in batch review:", error)
    throw new Error("Failed to batch review submissions")
  }
}

// Validator Management
export async function getValidatorProfile(wallet: string): Promise<ValidatorProfile | null> {
  try {
    if (wallet === mockValidatorProfile.wallet) {
      return mockValidatorProfile
    }
    return null
  } catch (error) {
    console.error("Error fetching validator profile:", error)
    throw new Error("Failed to fetch validator profile")
  }
}

export async function createValidator(validatorData: {
  wallet: string
  name?: string
  role: ValidatorProfile["role"]
  specializations: string[]
}): Promise<ValidatorProfile> {
  try {
    const validator: ValidatorProfile = {
      ...validatorData,
      totalReviewed: 0,
      approvalRate: 0,
      joinedAt: new Date(),
      isActive: true,
      reputation: 100,
    }

    return validator
  } catch (error) {
    console.error("Error creating validator:", error)
    throw new Error("Failed to create validator")
  }
}

export async function getValidatorStats(wallet: string): Promise<ValidatorStats> {
  try {
    return {
      totalReviewed: 1234,
      approvalRate: 87.3,
      avgReviewTime: 2.5,
      pendingCount: 47,
      todayReviewed: 23,
    }
  } catch (error) {
    console.error("Error fetching validator stats:", error)
    throw new Error("Failed to fetch validator stats")
  }
}

// Analytics
export async function getValidatorAnalytics(timeframe: "day" | "week" | "month" = "week") {
  try {
    return {
      submissionStats: [
        { status: "PENDING", _count: 47 },
        { status: "APPROVED", _count: 156 },
        { status: "REJECTED", _count: 23 },
      ],
      validatorPerformance: [
        { reviewedBy: "0xvalidator1", _count: 45, _avg: { reviewTimeHours: 2.1 } },
        { reviewedBy: "0xvalidator2", _count: 38, _avg: { reviewTimeHours: 3.2 } },
      ],
      rewardDistribution: {
        _sum: { approvedFLB: 12500 },
        _count: 156,
      },
      timeframe,
    }
  } catch (error) {
    console.error("Error fetching validator analytics:", error)
    throw new Error("Failed to fetch analytics")
  }
}
