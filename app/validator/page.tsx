"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  FileText,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Award,
  BarChart3,
} from "lucide-react"
import { useValidator } from "@/hooks/useValidator"
import { useWallet } from "@/contexts/WalletContext"
import { Navigation } from "@/components/navigation"

export default function ValidatorPage() {
  const { user } = useWallet()
  const {
    submissions,
    profile,
    stats,
    loading,
    error,
    isValidator,
    reviewSubmission,
    batchReview,
    getSubmissionCounts,
    getSubmissionsByPriority,
  } = useValidator()

  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([])
  const [reviewNotes, setReviewNotes] = useState("")
  const [adjustedFLB, setAdjustedFLB] = useState("")
  const [activeTab, setActiveTab] = useState("queue")

  const submissionCounts = getSubmissionCounts()
  const prioritySubmissions = getSubmissionsByPriority()

  if (!user) {
    return (
      <main className="relative w-full h-screen overflow-hidden bg-black">
        <Navigation />
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
          <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
              <p className="text-gray-400">Connect your wallet to access the validator portal</p>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  if (!isValidator) {
    return (
      <main className="relative w-full h-screen overflow-hidden bg-black">
        <Navigation />
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
          <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Access Denied</h3>
              <p className="text-gray-400">You don't have validator permissions for this portal</p>
              <p className="text-gray-500 text-sm mt-2">Contact an admin to request validator access</p>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  const handleSingleReview = async (submissionId: string, decision: "APPROVED" | "REJECTED") => {
    try {
      await reviewSubmission(
        submissionId,
        decision,
        reviewNotes || undefined,
        adjustedFLB ? Number.parseFloat(adjustedFLB) : undefined,
      )
      setReviewNotes("")
      setAdjustedFLB("")
    } catch (error) {
      console.error("Review failed:", error)
    }
  }

  const handleBatchReview = async (decision: "APPROVED" | "REJECTED") => {
    if (selectedSubmissions.length === 0) return

    try {
      await batchReview(selectedSubmissions, decision, reviewNotes || undefined)
      setSelectedSubmissions([])
      setReviewNotes("")
    } catch (error) {
      console.error("Batch review failed:", error)
    }
  }

  const toggleSubmissionSelection = (submissionId: string) => {
    setSelectedSubmissions((prev) =>
      prev.includes(submissionId) ? prev.filter((id) => id !== submissionId) : [...prev, submissionId],
    )
  }

  return (
    <main className="relative w-full min-h-screen bg-black">
      <Navigation />

      <div className="pt-20 pb-8 px-4 space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-orange-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-400 text-sm font-medium">Pending Reviews</p>
                    <p className="text-2xl font-bold text-white">{submissionCounts.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-400 text-sm font-medium">Total Reviewed</p>
                    <p className="text-2xl font-bold text-white">{stats?.totalReviewed || 0}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 text-sm font-medium">Approval Rate</p>
                    <p className="text-2xl font-bold text-white">{stats?.approvalRate.toFixed(1) || 0}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-400 text-sm font-medium">Today's Reviews</p>
                    <p className="text-2xl font-bold text-white">{stats?.todayReviewed || 0}</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Validator Profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 h-5 w-5 text-orange-500" />
                Validator Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Role</p>
                  <Badge variant="outline" className="bg-orange-900/30 text-orange-400 border-orange-800">
                    {profile?.role}
                  </Badge>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Reputation</p>
                  <p className="text-white font-bold">{profile?.reputation || 0}/1000</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Specializations</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile?.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900/50">
            <TabsTrigger value="queue" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              Review Queue
            </TabsTrigger>
            <TabsTrigger value="priority" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              Priority Items
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              Review History
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="queue" className="space-y-4">
            {/* Batch Actions */}
            {selectedSubmissions.length > 0 && (
              <Card className="bg-gray-900/50 border-yellow-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-yellow-500" />
                      <span className="text-white font-medium">{selectedSubmissions.length} submissions selected</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleBatchReview("APPROVED")}
                        disabled={loading}
                      >
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        Approve All
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleBatchReview("REJECTED")}
                        disabled={loading}
                      >
                        <ThumbsDown className="mr-1 h-4 w-4" />
                        Reject All
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Textarea
                      placeholder="Batch review notes (optional)"
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submissions List */}
            <div className="space-y-4">
              {submissions
                .filter((s) => s.status === "PENDING")
                .map((submission, index) => (
                  <motion.div
                    key={submission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <SubmissionCard
                      submission={submission}
                      isSelected={selectedSubmissions.includes(submission.id)}
                      onSelect={() => toggleSubmissionSelection(submission.id)}
                      onReview={handleSingleReview}
                      loading={loading}
                    />
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="priority" className="space-y-4">
            {/* High Priority */}
            {prioritySubmissions.high.length > 0 && (
              <div>
                <h3 className="text-red-400 font-bold mb-3 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  High Priority ({prioritySubmissions.high.length})
                </h3>
                <div className="space-y-3">
                  {prioritySubmissions.high.map((submission) => (
                    <SubmissionCard
                      key={submission.id}
                      submission={submission}
                      isSelected={selectedSubmissions.includes(submission.id)}
                      onSelect={() => toggleSubmissionSelection(submission.id)}
                      onReview={handleSingleReview}
                      loading={loading}
                      priority="high"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Medium Priority */}
            {prioritySubmissions.medium.length > 0 && (
              <div>
                <h3 className="text-yellow-400 font-bold mb-3 flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Medium Priority ({prioritySubmissions.medium.length})
                </h3>
                <div className="space-y-3">
                  {prioritySubmissions.medium.map((submission) => (
                    <SubmissionCard
                      key={submission.id}
                      submission={submission}
                      isSelected={selectedSubmissions.includes(submission.id)}
                      onSelect={() => toggleSubmissionSelection(submission.id)}
                      onReview={handleSingleReview}
                      loading={loading}
                      priority="medium"
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="space-y-4">
              {submissions
                .filter((s) => s.status !== "PENDING")
                .map((submission) => (
                  <SubmissionCard
                    key={submission.id}
                    submission={submission}
                    isSelected={false}
                    onSelect={() => {}}
                    onReview={() => {}}
                    loading={false}
                    readonly
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-orange-500" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Average Review Time</span>
                      <span className="text-white font-bold">{stats?.avgReviewTime.toFixed(1) || 0}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Approval Rate</span>
                      <span className="text-green-400 font-bold">{stats?.approvalRate.toFixed(1) || 0}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Reviews</span>
                      <span className="text-white font-bold">{stats?.totalReviewed || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-orange-500" />
                    Submission Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pending</span>
                      <span className="text-yellow-400 font-bold">{submissionCounts.pending}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Approved</span>
                      <span className="text-green-400 font-bold">{submissionCounts.approved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rejected</span>
                      <span className="text-red-400 font-bold">{submissionCounts.rejected}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function SubmissionCard({ submission, isSelected, onSelect, onReview, loading, priority, readonly = false }) {
  const [showDetails, setShowDetails] = useState(false)
  const [reviewNotes, setReviewNotes] = useState("")
  const [adjustedFLB, setAdjustedFLB] = useState("")

  const getPriorityColor = () => {
    switch (submission.priority) {
      case "HIGH":
        return "border-red-500/50 bg-red-900/10"
      case "MEDIUM":
        return "border-yellow-500/50 bg-yellow-900/10"
      default:
        return "border-gray-800"
    }
  }

  const getStatusIcon = () => {
    switch (submission.status) {
      case "APPROVED":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "REJECTED":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "UNDER_REVIEW":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card className={`bg-gray-900/50 ${getPriorityColor()} transition-colors`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            {!readonly && <Checkbox checked={isSelected} onCheckedChange={onSelect} className="mt-1" />}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {getStatusIcon()}
                <CardTitle className="text-white text-lg">{submission.title}</CardTitle>
                <Badge variant="outline" className="bg-orange-900/30 text-orange-400 border-orange-800">
                  {submission.requestedFLB} FLB
                </Badge>
                {submission.priority === "HIGH" && (
                  <Badge variant="outline" className="bg-red-900/30 text-red-400 border-red-800">
                    High Priority
                  </Badge>
                )}
              </div>
              <CardDescription className="text-gray-400">
                {submission.submissionType.replace("_", " ")} • {submission.user.wallet.slice(0, 8)}...
                {submission.course && ` • ${submission.course.name}`}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="text-gray-400 hover:text-white"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {showDetails && (
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium mb-2">Description</h4>
              <p className="text-gray-300 text-sm">{submission.description}</p>
            </div>

            {submission.evidenceUrl && (
              <div>
                <h4 className="text-white font-medium mb-2">Evidence</h4>
                <a
                  href={submission.evidenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 text-sm underline"
                >
                  View Evidence ({submission.evidenceType})
                </a>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Submitted:</span>
                <span className="text-white ml-2">{new Date(submission.submittedAt).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-gray-400">Type:</span>
                <span className="text-white ml-2">{submission.submissionType}</span>
              </div>
            </div>

            {submission.reviewedAt && (
              <div className="border-t border-gray-800 pt-4">
                <h4 className="text-white font-medium mb-2">Review Details</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Reviewed by:</span>
                    <span className="text-white ml-2">{submission.reviewedBy?.slice(0, 8)}...</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Review date:</span>
                    <span className="text-white ml-2">{new Date(submission.reviewedAt).toLocaleDateString()}</span>
                  </div>
                  {submission.reviewerNotes && (
                    <div>
                      <span className="text-gray-400">Notes:</span>
                      <p className="text-white mt-1">{submission.reviewerNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!readonly && submission.status === "PENDING" && (
              <div className="border-t border-gray-800 pt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 text-sm">Review Notes</label>
                    <Textarea
                      placeholder="Optional review notes..."
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Adjust FLB Amount</label>
                    <Input
                      type="number"
                      placeholder={submission.requestedFLB.toString()}
                      value={adjustedFLB}
                      onChange={(e) => setAdjustedFLB(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    className="bg-green-600 hover:bg-green-700 flex-1"
                    onClick={() => onReview(submission.id, "APPROVED")}
                    disabled={loading}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => onReview(submission.id, "REJECTED")}
                    disabled={loading}
                  >
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
