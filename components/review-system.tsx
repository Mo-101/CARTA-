"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Flag,
  MoreVertical,
  Plus,
  Filter,
  CheckCircle,
  Shield,
  Edit,
  Trash2,
} from "lucide-react"
import { useWallet } from "@/contexts/WalletContext"
import {
  type Review,
  type ReviewStats,
  getReviews,
  getReviewStats,
  createReview,
  markReviewHelpful,
  reportReview,
  replyToReview,
} from "@/lib/reviews"

interface ReviewSystemProps {
  targetId: string
  targetType: "COURSE" | "VALIDATOR" | "HEALTH_FACILITY" | "COMMUNITY_POST"
  targetTitle?: string
  showWriteReview?: boolean
  compact?: boolean
}

export function ReviewSystem({
  targetId,
  targetType,
  targetTitle,
  showWriteReview = true,
  compact = false,
}: ReviewSystemProps) {
  const { user } = useWallet()
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "rating_high" | "rating_low" | "helpful">("newest")
  const [showWriteDialog, setShowWriteDialog] = useState(false)

  useEffect(() => {
    loadReviews()
    loadStats()
  }, [targetId, targetType, sortBy])

  const loadReviews = async () => {
    try {
      setLoading(true)
      const reviewData = await getReviews(targetId, targetType, 10, sortBy)
      setReviews(reviewData)
    } catch (error) {
      console.error("Failed to load reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const statsData = await getReviewStats(targetId, targetType)
      setStats(statsData)
    } catch (error) {
      console.error("Failed to load review stats:", error)
    }
  }

  if (compact && stats) {
    return <CompactReviewDisplay stats={stats} onClick={() => setShowWriteDialog(true)} />
  }

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      {stats && <ReviewStatsDisplay stats={stats} />}

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-white">Reviews ({stats?.totalReviews || 0})</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-white">
                <Filter className="mr-2 h-4 w-4" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              <DropdownMenuItem onClick={() => setSortBy("newest")} className="text-white hover:bg-gray-700">
                Newest first
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("oldest")} className="text-white hover:bg-gray-700">
                Oldest first
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("rating_high")} className="text-white hover:bg-gray-700">
                Highest rated
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("rating_low")} className="text-white hover:bg-gray-700">
                Lowest rated
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("helpful")} className="text-white hover:bg-gray-700">
                Most helpful
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {showWriteReview && user && (
          <Dialog open={showWriteDialog} onOpenChange={setShowWriteDialog}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold">
                <Plus className="mr-2 h-4 w-4" />
                Write Review
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
              <WriteReviewForm
                targetId={targetId}
                targetType={targetType}
                targetTitle={targetTitle}
                onSuccess={() => {
                  setShowWriteDialog(false)
                  loadReviews()
                  loadStats()
                }}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-gray-900/50 border-gray-800 animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-full mb-4"></div>
                  <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <AnimatePresence>
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <ReviewCard review={review} onUpdate={loadReviews} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No reviews yet</h3>
              <p className="text-gray-400 mb-4">Be the first to share your experience!</p>
              {showWriteReview && user && (
                <Button
                  onClick={() => setShowWriteDialog(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
                >
                  Write the first review
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function ReviewStatsDisplay({ stats }: { stats: ReviewStats }) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{stats.averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(stats.averageRating) ? "text-yellow-400 fill-current" : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-400">
                Based on {stats.totalReviews} review{stats.totalReviews !== 1 ? "s" : ""}
              </p>
              {stats.verifiedReviews > 0 && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-2">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  {stats.verifiedReviews} verified
                </Badge>
              )}
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm text-white">{rating}</span>
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                </div>
                <Progress
                  value={
                    (stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution] / stats.totalReviews) *
                    100
                  }
                  className="flex-1 h-2"
                />
                <span className="text-sm text-gray-400 w-8">
                  {stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CompactReviewDisplay({ stats, onClick }: { stats: ReviewStats; onClick: () => void }) {
  return (
    <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={onClick}>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(stats.averageRating) ? "text-yellow-400 fill-current" : "text-gray-600"
            }`}
          />
        ))}
      </div>
      <span className="text-white font-medium">{stats.averageRating.toFixed(1)}</span>
      <span className="text-gray-400">({stats.totalReviews})</span>
      {stats.verifiedReviews > 0 && (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
          <CheckCircle className="mr-1 h-2 w-2" />
          Verified
        </Badge>
      )}
    </div>
  )
}

function ReviewCard({ review, onUpdate }: { review: Review; onUpdate: () => void }) {
  const { user } = useWallet()
  const [showReplies, setShowReplies] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [submittingReply, setSubmittingReply] = useState(false)

  const handleMarkHelpful = async () => {
    if (!user) return
    try {
      await markReviewHelpful(review.id, user.wallet)
      onUpdate()
    } catch (error) {
      console.error("Failed to mark helpful:", error)
    }
  }

  const handleReport = async () => {
    if (!user) return
    try {
      await reportReview(review.id, user.wallet, "inappropriate")
      onUpdate()
    } catch (error) {
      console.error("Failed to report:", error)
    }
  }

  const handleReply = async () => {
    if (!user || !replyContent.trim()) return

    try {
      setSubmittingReply(true)
      await replyToReview({
        reviewId: review.id,
        userId: user.wallet,
        content: replyContent.trim(),
      })
      setReplyContent("")
      onUpdate()
    } catch (error) {
      console.error("Failed to reply:", error)
    } finally {
      setSubmittingReply(false)
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardContent className="p-6">
        {/* Review Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-gray-700 text-white">
                {review.user.name?.charAt(0) || review.user.wallet.slice(2, 4).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-white">
                  {review.user.name || `${review.user.wallet.slice(0, 6)}...${review.user.wallet.slice(-4)}`}
                </h4>
                {review.isVerified && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    <CheckCircle className="mr-1 h-2 w-2" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              {user?.wallet === review.user.wallet ? (
                <>
                  <DropdownMenuItem className="text-white hover:bg-gray-700">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit review
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-400 hover:bg-gray-700">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete review
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={handleReport} className="text-red-400 hover:bg-gray-700">
                  <Flag className="mr-2 h-4 w-4" />
                  Report review
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Review Content */}
        <div className="space-y-3">
          <h5 className="font-medium text-white">{review.title}</h5>
          <p className="text-gray-300 leading-relaxed">{review.content}</p>

          {/* Pros and Cons */}
          {(review.pros?.length || review.cons?.length) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {review.pros && review.pros.length > 0 && (
                <div>
                  <h6 className="text-sm font-medium text-green-400 mb-2">Pros</h6>
                  <ul className="space-y-1">
                    {review.pros.map((pro, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-start">
                        <ThumbsUp className="h-3 w-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {review.cons && review.cons.length > 0 && (
                <div>
                  <h6 className="text-sm font-medium text-red-400 mb-2">Cons</h6>
                  <ul className="space-y-1">
                    {review.cons.map((con, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-start">
                        <ThumbsDown className="h-3 w-3 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Review Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkHelpful}
              className="text-gray-400 hover:text-white"
              disabled={!user}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Helpful ({review.helpfulCount})
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplies(!showReplies)}
              className="text-gray-400 hover:text-white"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Reply ({review.replies?.length || 0})
            </Button>
          </div>
        </div>

        {/* Replies Section */}
        {showReplies && (
          <div className="mt-4 pt-4 border-t border-gray-800 space-y-4">
            {/* Existing Replies */}
            {review.replies?.map((reply) => (
              <div key={reply.id} className="flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={reply.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-700 text-white text-xs">
                    {reply.user.name?.charAt(0) || reply.user.wallet.slice(2, 4).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">
                      {reply.user.name || `${reply.user.wallet.slice(0, 6)}...${reply.user.wallet.slice(-4)}`}
                    </span>
                    {reply.isOfficial && (
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                        <Shield className="mr-1 h-2 w-2" />
                        Official
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{reply.content}</p>
                </div>
              </div>
            ))}

            {/* Reply Form */}
            {user && (
              <div className="flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gray-700 text-white text-xs">
                    {user.wallet.slice(2, 4).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white resize-none"
                    rows={2}
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      onClick={handleReply}
                      disabled={!replyContent.trim() || submittingReply}
                      className="bg-orange-500 hover:bg-orange-600 text-black"
                    >
                      {submittingReply ? "Posting..." : "Post Reply"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function WriteReviewForm({
  targetId,
  targetType,
  targetTitle,
  onSuccess,
}: {
  targetId: string
  targetType: "COURSE" | "VALIDATOR" | "HEALTH_FACILITY" | "COMMUNITY_POST"
  targetTitle?: string
  onSuccess: () => void
}) {
  const { user } = useWallet()
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [pros, setPros] = useState<string[]>([])
  const [cons, setCons] = useState<string[]>([])
  const [newPro, setNewPro] = useState("")
  const [newCon, setNewCon] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const addPro = () => {
    if (newPro.trim()) {
      setPros([...pros, newPro.trim()])
      setNewPro("")
    }
  }

  const addCon = () => {
    if (newCon.trim()) {
      setCons([...cons, newCon.trim()])
      setNewCon("")
    }
  }

  const removePro = (index: number) => {
    setPros(pros.filter((_, i) => i !== index))
  }

  const removeCon = (index: number) => {
    setCons(cons.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!user || rating === 0 || !title.trim() || !content.trim()) return

    try {
      setSubmitting(true)
      await createReview({
        userId: user.wallet,
        targetId,
        targetType,
        rating,
        title: title.trim(),
        content: content.trim(),
        pros: pros.length > 0 ? pros : undefined,
        cons: cons.length > 0 ? cons : undefined,
      })
      onSuccess()
    } catch (error) {
      console.error("Failed to create review:", error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-white">Write a Review</DialogTitle>
        <DialogDescription className="text-gray-400">
          {targetTitle ? `Share your experience with ${targetTitle}` : "Share your experience"}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Rating</label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                <Star
                  className={`h-8 w-8 transition-colors ${
                    star <= rating ? "text-yellow-400 fill-current" : "text-gray-600 hover:text-yellow-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Review Title</label>
          <Input
            placeholder="Summarize your experience..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Your Review</label>
          <Textarea
            placeholder="Tell others about your experience..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            rows={4}
          />
        </div>

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pros */}
          <div>
            <label className="block text-sm font-medium text-green-400 mb-2">Pros (Optional)</label>
            <div className="space-y-2">
              {pros.map((pro, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                  <span className="text-sm text-gray-300">{pro}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removePro(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a positive point..."
                  value={newPro}
                  onChange={(e) => setNewPro(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addPro()}
                  className="bg-gray-800 border-gray-700 text-white text-sm"
                />
                <Button
                  type="button"
                  onClick={addPro}
                  disabled={!newPro.trim()}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Cons */}
          <div>
            <label className="block text-sm font-medium text-red-400 mb-2">Cons (Optional)</label>
            <div className="space-y-2">
              {cons.map((con, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                  <span className="text-sm text-gray-300">{con}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCon(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a negative point..."
                  value={newCon}
                  onChange={(e) => setNewCon(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCon()}
                  className="bg-gray-800 border-gray-700 text-white text-sm"
                />
                <Button
                  type="button"
                  onClick={addCon}
                  disabled={!newCon.trim()}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onSuccess()}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || !title.trim() || !content.trim() || submitting}
            className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
          >
            {submitting ? "Publishing..." : "Publish Review"}
          </Button>
        </div>
      </div>
    </>
  )
}
