"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Upload, FileText, Video, ImageIcon, Link, Send } from "lucide-react"
import { useValidator } from "@/hooks/useValidator"

interface SubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  courseId?: string
  courseName?: string
  courseReward?: number
}

export function SubmissionModal({ isOpen, onClose, courseId, courseName, courseReward }: SubmissionModalProps) {
  const { createSubmission, loading } = useValidator()

  const [formData, setFormData] = useState({
    submissionType: courseId ? "COURSE_COMPLETION" : "PROJECT_SUBMISSION",
    title: "",
    description: "",
    evidenceUrl: "",
    evidenceType: "LINK" as "VIDEO" | "IMAGE" | "DOCUMENT" | "LINK",
    requestedFLB: courseReward || 50,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (formData.requestedFLB <= 0) newErrors.requestedFLB = "FLB amount must be positive"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await createSubmission({
        submissionType: formData.submissionType,
        courseId,
        title: formData.title,
        description: formData.description,
        evidenceUrl: formData.evidenceUrl || undefined,
        evidenceType: formData.evidenceUrl ? formData.evidenceType : undefined,
        requestedFLB: formData.requestedFLB,
      })

      // Reset form and close
      setFormData({
        submissionType: courseId ? "COURSE_COMPLETION" : "PROJECT_SUBMISSION",
        title: "",
        description: "",
        evidenceUrl: "",
        evidenceType: "LINK",
        requestedFLB: courseReward || 50,
      })
      setErrors({})
      onClose()
    } catch (error) {
      console.error("Submission failed:", error)
    }
  }

  const getEvidenceIcon = () => {
    switch (formData.evidenceType) {
      case "VIDEO":
        return <Video className="h-4 w-4" />
      case "IMAGE":
        return <ImageIcon className="h-4 w-4" />
      case "DOCUMENT":
        return <FileText className="h-4 w-4" />
      default:
        return <Link className="h-4 w-4" />
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl"
          >
            <Card className="bg-black/90 border-orange-500/30 backdrop-blur-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center">
                      <Upload className="mr-2 h-5 w-5 text-orange-500" />
                      Submit for Review
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {courseId ? `Submit completion for: ${courseName}` : "Submit your work for FLB rewards"}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Submission Type */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 block mb-2">Submission Type</label>
                    <select
                      value={formData.submissionType}
                      onChange={(e) => setFormData((prev) => ({ ...prev, submissionType: e.target.value as any }))}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                      disabled={!!courseId}
                    >
                      <option value="COURSE_COMPLETION">Course Completion</option>
                      <option value="PROJECT_SUBMISSION">Project Submission</option>
                      <option value="PEER_REVIEW">Peer Review</option>
                      <option value="COMMUNITY_ACTION">Community Action</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 block mb-2">Title *</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Brief title for your submission"
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                    {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 block mb-2">Description *</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Detailed description of what you accomplished..."
                      className="bg-gray-900/50 border-gray-700 text-white"
                      rows={4}
                    />
                    {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
                  </div>

                  {/* Evidence */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 block mb-2">Evidence (Optional)</label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <select
                          value={formData.evidenceType}
                          onChange={(e) => setFormData((prev) => ({ ...prev, evidenceType: e.target.value as any }))}
                          className="bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                        >
                          <option value="LINK">Link</option>
                          <option value="VIDEO">Video</option>
                          <option value="IMAGE">Image</option>
                          <option value="DOCUMENT">Document</option>
                        </select>
                        <Input
                          value={formData.evidenceUrl}
                          onChange={(e) => setFormData((prev) => ({ ...prev, evidenceUrl: e.target.value }))}
                          placeholder="URL to your evidence"
                          className="bg-gray-900/50 border-gray-700 text-white flex-1"
                        />
                      </div>
                      <p className="text-gray-500 text-xs">
                        Provide a link to evidence of your work (GitHub, video, images, etc.)
                      </p>
                    </div>
                  </div>

                  {/* Requested FLB */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 block mb-2">Requested FLB Amount *</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={formData.requestedFLB}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, requestedFLB: Number.parseFloat(e.target.value) || 0 }))
                        }
                        className="bg-gray-900/50 border-gray-700 text-white"
                        min="1"
                        max="500"
                        disabled={!!courseReward}
                      />
                      <Badge variant="outline" className="bg-orange-900/30 text-orange-400 border-orange-800">
                        FLB
                      </Badge>
                    </div>
                    {courseReward && (
                      <p className="text-gray-500 text-xs mt-1">
                        Course completion reward is fixed at {courseReward} FLB
                      </p>
                    )}
                    {errors.requestedFLB && <p className="text-red-400 text-sm mt-1">{errors.requestedFLB}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-bold"
                      disabled={loading}
                    >
                      {loading ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit for Review
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
