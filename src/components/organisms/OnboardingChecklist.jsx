import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

const defaultOnboardingSteps = [
  {
    id: 1,
    title: 'Complete Personal Information',
    description: 'Fill out all required personal details and emergency contacts',
    completed: false
  },
  {
    id: 2,
    title: 'Review Company Handbook',
    description: 'Read and acknowledge the employee handbook and policies',
    completed: false
  },
  {
    id: 3,
    title: 'Set Up IT Equipment',
    description: 'Configure laptop, email, and access to necessary systems',
    completed: false
  },
  {
    id: 4,
    title: 'Complete HR Paperwork',
    description: 'Submit tax forms, benefits enrollment, and other required documents',
    completed: false
  },
  {
    id: 5,
    title: 'Attend Orientation Session',
    description: 'Participate in company orientation and meet team members',
    completed: false
  },
  {
    id: 6,
    title: 'Complete Security Training',
    description: 'Finish required security awareness and compliance training',
    completed: false
  },
  {
    id: 7,
    title: 'Manager Check-in',
    description: 'Schedule and complete initial check-in with direct manager',
    completed: false
  }
]

const OnboardingChecklist = ({ employee, onProgressUpdate }) => {
  const [steps, setSteps] = useState(
    employee?.onboardingProgress || defaultOnboardingSteps
  )

  const completedCount = steps.filter(step => step.completed).length
  const totalSteps = steps.length
  const progressPercentage = Math.round((completedCount / totalSteps) * 100)

  const handleStepToggle = async (stepId) => {
    const updatedSteps = steps.map(step =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    )
    
    setSteps(updatedSteps)
    
    try {
      await onProgressUpdate(updatedSteps)
      const step = updatedSteps.find(s => s.id === stepId)
      toast.success(
        step.completed 
          ? `✅ ${step.title} marked as completed!`
          : `⏸️ ${step.title} marked as incomplete`
      )
    } catch (error) {
      // Revert on error
      setSteps(steps)
      toast.error('Failed to update onboarding progress')
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Onboarding Progress
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {completedCount} of {totalSteps} steps completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              {progressPercentage}%
            </div>
            <div className="text-xs text-gray-500">Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-start space-x-4 p-4 rounded-lg border transition-all duration-200",
                step.completed
                  ? "bg-accent-50 border-accent-200"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              )}
            >
              {/* Checkbox */}
              <button
                onClick={() => handleStepToggle(step.id)}
                className={cn(
                  "flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                  step.completed
                    ? "bg-accent-500 border-accent-500 text-white"
                    : "border-gray-300 hover:border-primary-400"
                )}
              >
                {step.completed && (
                  <ApperIcon name="Check" className="w-4 h-4" />
                )}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={cn(
                    "font-medium",
                    step.completed
                      ? "text-accent-700 line-through"
                      : "text-gray-900"
                  )}>
                    {step.title}
                  </h4>
                  <span className="text-xs text-gray-500 ml-2">
                    Step {step.id}
                  </span>
                </div>
                <p className={cn(
                  "text-sm mt-1",
                  step.completed
                    ? "text-accent-600"
                    : "text-gray-600"
                )}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
{progressPercentage === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-accent-500 to-primary-500 text-white p-4 rounded-lg text-center"
          >
            <ApperIcon name="PartyPopper" className="w-8 h-8 mx-auto mb-2" />
            <h4 className="font-semibold text-lg">Onboarding Complete! 🎉</h4>
            <p className="text-sm opacity-90 mt-1">
              {employee?.firstName || employee?.first_name_c} has completed all onboarding steps
            </p>
          </motion.div>
        )}
      </div>
    </Card>
  )
}

export default OnboardingChecklist