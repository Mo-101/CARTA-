"use server"

export interface User {
  wallet: string
  name?: string
  avatar?: string
  isVerified?: boolean
}

export interface ReviewReply {
  id: string
  reviewId: string
  user: User
  content: string
  createdAt: Date
  isOfficial?: boolean
}

export interface Review {
  id: string
  user: User
  targetId: string
  targetType: "COURSE" | "VALIDATOR" | "HEALTH_FACILITY" | "COMMUNITY_POST"
  rating: number
  title: string
  content: string
  pros?: string[]
  cons?: string[]
  isVerified: boolean
  helpfulCount: number
  createdAt: Date
  updatedAt: Date
  replies?: ReviewReply[]
}

export interface ReviewStats {
  totalReviews: number
  averageRating: number
  verifiedReviews: number
  ratingDistribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
}

// Mock data for development
const mockUsers: User[] = [
  {
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    isVerified: true,
  },
  {
    wallet: "0x2345678901bcdef12345678901bcdef123456789",
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    isVerified: false,
  },
  {
    wallet: "0x3456789012cdef123456789012cdef1234567890",
    name: "Amara Okafor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amara",
    isVerified: true,
  },
]

const mockReviews: Review[] = [
  {
    id: "review_1",
    user: mockUsers[0],
    targetId: "course_1",
    targetType: "COURSE",
    rating: 5,
    title: "Excellent course on African health systems",
    content:
      "This course provided comprehensive insights into healthcare delivery across Africa. The content was well-structured and the examples were relevant to real-world scenarios. I particularly appreciated the focus on community-based healthcare models.",
    pros: ["Well-structured content", "Real-world examples", "Community focus"],
    cons: ["Could use more interactive elements"],
    isVerified: true,
    helpfulCount: 23,
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000 * 2),
    replies: [
      {
        id: "reply_1",
        reviewId: "review_1",
        user: {
          wallet: "0x0000000000000000000000000000000000000000",
          name: "FlameBorn Team",
          isVerified: true,
        },
        content:
          "Thank you for your detailed feedback! We're working on adding more interactive elements in our next update.",
        createdAt: new Date(Date.now() - 86400000),
        isOfficial: true,
      },
    ],
  },
  {
    id: "review_2",
    user: mockUsers[1],
    targetId: "course_1",
    targetType: "COURSE",
    rating: 4,
    title: "Good introduction to health systems",
    content:
      "A solid foundation course that covers the basics well. The instructor explains complex concepts clearly, though I would have liked more depth in certain areas.",
    pros: ["Clear explanations", "Good foundation"],
    cons: ["Could be more detailed", "Limited advanced topics"],
    isVerified: false,
    helpfulCount: 15,
    createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
    updatedAt: new Date(Date.now() - 86400000 * 5),
  },
  {
    id: "review_3",
    user: mockUsers[2],
    targetId: "course_1",
    targetType: "COURSE",
    rating: 5,
    title: "Transformative learning experience",
    content:
      "This course changed my perspective on healthcare in Africa. The case studies were particularly impactful, and I feel much more prepared to contribute to health initiatives in my community.",
    pros: ["Impactful case studies", "Practical applications", "Community relevance"],
    cons: [],
    isVerified: true,
    helpfulCount: 31,
    createdAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
    updatedAt: new Date(Date.now() - 86400000 * 7),
  },
]

// Review Management Functions
export async function getReviews(
  targetId: string,
  targetType: "COURSE" | "VALIDATOR" | "HEALTH_FACILITY" | "COMMUNITY_POST",
  limit = 10,
  sortBy: "newest" | "oldest" | "rating_high" | "rating_low" | "helpful" = "newest",
): Promise<Review[]> {
  try {
    const filteredReviews = mockReviews.filter(
      (review) => review.targetId === targetId && review.targetType === targetType,
    )

    // Sort reviews
    switch (sortBy) {
      case "newest":
        filteredReviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case "oldest":
        filteredReviews.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        break
      case "rating_high":
        filteredReviews.sort((a, b) => b.rating - a.rating)
        break
      case "rating_low":
        filteredReviews.sort((a, b) => a.rating - b.rating)
        break
      case "helpful":
        filteredReviews.sort((a, b) => b.helpfulCount - a.helpfulCount)
        break
    }

    return filteredReviews.slice(0, limit)
  } catch (error) {
    console.error("Error fetching reviews:", error)
    throw new Error("Failed to fetch reviews")
  }
}

export async function getReviewStats(
  targetId: string,
  targetType: "COURSE" | "VALIDATOR" | "HEALTH_FACILITY" | "COMMUNITY_POST",
): Promise<ReviewStats> {
  try {
    const reviews = mockReviews.filter((review) => review.targetId === targetId && review.targetType === targetType)

    if (reviews.length === 0) {
      return {
        totalReviews: 0,
        averageRating: 0,
        verifiedReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      }
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRating / reviews.length
    const verifiedReviews = reviews.filter((review) => review.isVerified).length

    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    reviews.forEach((review) => {
      ratingDistribution[review.rating as keyof typeof ratingDistribution]++
    })

    return {
      totalReviews: reviews.length,
      averageRating,
      verifiedReviews,
      ratingDistribution,
    }
  } catch (error) {
    console.error("Error fetching review stats:", error)
    throw new Error("Failed to fetch review stats")
  }
}

export async function createReview(reviewData: {
  userId: string
  targetId: string
  targetType: "COURSE" | "VALIDATOR" | "HEALTH_FACILITY" | "COMMUNITY_POST"
  rating: number
  title: string
  content: string
  pros?: string[]
  cons?: string[]
}): Promise<Review> {
  try {
    // Validate input
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new Error("Rating must be between 1 and 5")
    }

    if (!reviewData.title.trim() || !reviewData.content.trim()) {
      throw new Error("Title and content are required")
    }

    // Create new review
    const newReview: Review = {
      id: `review_${Date.now()}`,
      user: {
        wallet: reviewData.userId,
        name: `User ${reviewData.userId.slice(0, 8)}`,
        isVerified: false,
      },
      targetId: reviewData.targetId,
      targetType: reviewData.targetType,
      rating: reviewData.rating,
      title: reviewData.title.trim(),
      content: reviewData.content.trim(),
      pros: reviewData.pros?.filter((pro) => pro.trim()) || [],
      cons: reviewData.cons?.filter((con) => con.trim()) || [],
      isVerified: false, // Would be determined by validation logic
      helpfulCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      replies: [],
    }

    // In a real implementation, this would save to database
    mockReviews.push(newReview)

    return newReview
  } catch (error) {
    console.error("Error creating review:", error)
    throw new Error("Failed to create review")
  }
}

export async function markReviewHelpful(reviewId: string, userId: string): Promise<void> {
  try {
    const review = mockReviews.find((r) => r.id === reviewId)
    if (!review) {
      throw new Error("Review not found")
    }

    // In a real implementation, you'd check if user already marked as helpful
    // and store the relationship in a separate table
    review.helpfulCount += 1
    review.updatedAt = new Date()
  } catch (error) {
    console.error("Error marking review helpful:", error)
    throw new Error("Failed to mark review helpful")
  }
}

export async function reportReview(reviewId: string, userId: string, reason: string): Promise<void> {
  try {
    // In a real implementation, this would create a report record
    console.log(`Review ${reviewId} reported by ${userId} for: ${reason}`)
  } catch (error) {
    console.error("Error reporting review:", error)
    throw new Error("Failed to report review")
  }
}

export async function replyToReview(replyData: {
  reviewId: string
  userId: string
  content: string
}): Promise<ReviewReply> {
  try {
    const review = mockReviews.find((r) => r.id === replyData.reviewId)
    if (!review) {
      throw new Error("Review not found")
    }

    const newReply: ReviewReply = {
      id: `reply_${Date.now()}`,
      reviewId: replyData.reviewId,
      user: {
        wallet: replyData.userId,
        name: `User ${replyData.userId.slice(0, 8)}`,
      },
      content: replyData.content.trim(),
      createdAt: new Date(),
      isOfficial: false,
    }

    if (!review.replies) {
      review.replies = []
    }
    review.replies.push(newReply)

    return newReply
  } catch (error) {
    console.error("Error replying to review:", error)
    throw new Error("Failed to reply to review")
  }
}

export async function updateReview(
  reviewId: string,
  userId: string,
  updates: {
    rating?: number
    title?: string
    content?: string
    pros?: string[]
    cons?: string[]
  },
): Promise<Review> {
  try {
    const review = mockReviews.find((r) => r.id === reviewId)
    if (!review) {
      throw new Error("Review not found")
    }

    if (review.user.wallet !== userId) {
      throw new Error("Unauthorized to update this review")
    }

    // Update fields
    if (updates.rating !== undefined) {
      if (updates.rating < 1 || updates.rating > 5) {
        throw new Error("Rating must be between 1 and 5")
      }
      review.rating = updates.rating
    }

    if (updates.title !== undefined) {
      review.title = updates.title.trim()
    }

    if (updates.content !== undefined) {
      review.content = updates.content.trim()
    }

    if (updates.pros !== undefined) {
      review.pros = updates.pros.filter((pro) => pro.trim())
    }

    if (updates.cons !== undefined) {
      review.cons = updates.cons.filter((con) => con.trim())
    }

    review.updatedAt = new Date()

    return review
  } catch (error) {
    console.error("Error updating review:", error)
    throw new Error("Failed to update review")
  }
}

export async function deleteReview(reviewId: string, userId: string): Promise<void> {
  try {
    const reviewIndex = mockReviews.findIndex((r) => r.id === reviewId)
    if (reviewIndex === -1) {
      throw new Error("Review not found")
    }

    const review = mockReviews[reviewIndex]
    if (review.user.wallet !== userId) {
      throw new Error("Unauthorized to delete this review")
    }

    mockReviews.splice(reviewIndex, 1)
  } catch (error) {
    console.error("Error deleting review:", error)
    throw new Error("Failed to delete review")
  }
}
