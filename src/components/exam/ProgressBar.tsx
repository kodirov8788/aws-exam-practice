"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  showLabel?: boolean;
  variant?: "default" | "success" | "warning" | "error";
}

export function ProgressBar({
  current,
  total,
  className,
  showLabel = true,
}: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={cn("w-full space-y-2", className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Progress</span>
          <span>
            {current} of {total} ({percentage.toFixed(1)}%)
          </span>
        </div>
      )}
      <Progress value={percentage} className="h-2" />
    </div>
  );
}

interface CircularProgressProps {
  current: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
  variant?: "default" | "success" | "warning" | "error";
}

export function CircularProgress({
  current,
  total,
  size = 120,
  strokeWidth = 8,
  className,
  showLabel = true,
  variant = "default",
}: CircularProgressProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "stroke-green-500";
      case "warning":
        return "stroke-yellow-500";
      case "error":
        return "stroke-red-500";
      default:
        return "stroke-primary";
    }
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(
            "transition-all duration-300 ease-in-out",
            getVariantStyles()
          )}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">{current}</div>
            <div className="text-xs text-muted-foreground">of {total}</div>
          </div>
        </div>
      )}
    </div>
  );
}

interface StepProgressProps {
  steps: string[];
  currentStep: number;
  className?: string;
  variant?: "default" | "success" | "warning" | "error";
}

export function StepProgress({
  steps,
  currentStep,
  className,
}: StepProgressProps) {
  const getStepStatus = (index: number) => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return "current";
    return "pending";
  };

  const getStepStyles = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500 border-green-500 text-white";
      case "current":
        return "bg-primary border-primary text-primary-foreground";
      case "pending":
        return "bg-muted border-muted-foreground/30 text-muted-foreground";
      default:
        return "bg-muted border-muted-foreground/30 text-muted-foreground";
    }
  };

  const getConnectorStyles = (index: number) => {
    if (index < currentStep) return "bg-green-500";
    return "bg-muted";
  };

  return (
    <div className={cn("flex items-center space-x-4", className)}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex items-center">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition-all duration-200",
                getStepStyles(getStepStatus(index))
              )}
            >
              {getStepStatus(index) === "completed" ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className="ml-2 text-sm font-medium text-foreground">
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-12 h-0.5 mx-4 transition-all duration-200",
                getConnectorStyles(index)
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
