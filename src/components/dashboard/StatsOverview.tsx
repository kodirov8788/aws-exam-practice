"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Target,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { scoringManager } from "@/lib/utils/scoring";

interface StatsOverviewProps {
  totalGroups: number;
  completedGroups: number;
  overallAccuracy: number;
  totalQuestionsAnswered: number;
  completionPercentage: number;
  className?: string;
}

export function StatsOverview({
  totalGroups,
  completedGroups,
  overallAccuracy,
  totalQuestionsAnswered,
  completionPercentage,
  className,
}: StatsOverviewProps) {
  const milestones = scoringManager.checkMilestones();

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return "text-green-600";
    if (accuracy >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 75) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-blue-600";
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Overall Accuracy
                </p>
                <p
                  className={cn(
                    "text-2xl font-bold",
                    getAccuracyColor(overallAccuracy)
                  )}
                >
                  {overallAccuracy.toFixed(1)}%
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Questions Answered
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalQuestionsAnswered}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Groups Completed
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {completedGroups}/{totalGroups}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completion
                </p>
                <p
                  className={cn(
                    "text-2xl font-bold",
                    getCompletionColor(completionPercentage)
                  )}
                >
                  {completionPercentage.toFixed(0)}%
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Course Completion</span>
              <span className="font-medium">
                {completedGroups} of {totalGroups} groups completed
              </span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
            <div className="text-xs text-muted-foreground">
              {completionPercentage.toFixed(1)}% of the AWS Cloud Practitioner
              course completed
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              className={cn(
                "p-4 rounded-lg border-2 text-center transition-all duration-200",
                milestones.firstGroupCompleted
                  ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                  : "border-muted bg-muted/50"
              )}
            >
              <div
                className={cn(
                  "text-2xl font-bold mb-1",
                  milestones.firstGroupCompleted
                    ? "text-green-600"
                    : "text-muted-foreground"
                )}
              >
                1
              </div>
              <div className="text-xs text-muted-foreground">First Group</div>
              {milestones.firstGroupCompleted && (
                <CheckCircle className="w-4 h-4 text-green-600 mx-auto mt-1" />
              )}
            </div>

            <div
              className={cn(
                "p-4 rounded-lg border-2 text-center transition-all duration-200",
                milestones.firstDomainCompleted
                  ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                  : "border-muted bg-muted/50"
              )}
            >
              <div
                className={cn(
                  "text-2xl font-bold mb-1",
                  milestones.firstDomainCompleted
                    ? "text-green-600"
                    : "text-muted-foreground"
                )}
              >
                3
              </div>
              <div className="text-xs text-muted-foreground">First Domain</div>
              {milestones.firstDomainCompleted && (
                <CheckCircle className="w-4 h-4 text-green-600 mx-auto mt-1" />
              )}
            </div>

            <div
              className={cn(
                "p-4 rounded-lg border-2 text-center transition-all duration-200",
                milestones.halfWayCompleted
                  ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                  : "border-muted bg-muted/50"
              )}
            >
              <div
                className={cn(
                  "text-2xl font-bold mb-1",
                  milestones.halfWayCompleted
                    ? "text-green-600"
                    : "text-muted-foreground"
                )}
              >
                6
              </div>
              <div className="text-xs text-muted-foreground">Halfway</div>
              {milestones.halfWayCompleted && (
                <CheckCircle className="w-4 h-4 text-green-600 mx-auto mt-1" />
              )}
            </div>

            <div
              className={cn(
                "p-4 rounded-lg border-2 text-center transition-all duration-200",
                milestones.allCompleted
                  ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                  : "border-muted bg-muted/50"
              )}
            >
              <div
                className={cn(
                  "text-2xl font-bold mb-1",
                  milestones.allCompleted
                    ? "text-yellow-600"
                    : "text-muted-foreground"
                )}
              >
                12
              </div>
              <div className="text-xs text-muted-foreground">All Complete</div>
              {milestones.allCompleted && (
                <Award className="w-4 h-4 text-yellow-600 mx-auto mt-1" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {overallAccuracy >= 80 ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium text-green-800 dark:text-green-200">
                    Excellent Performance!
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    You&apos;re maintaining a strong accuracy rate. Keep up the
                    great work!
                  </div>
                </div>
              </div>
            ) : overallAccuracy >= 60 ? (
              <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <div className="font-medium text-yellow-800 dark:text-yellow-200">
                    Good Progress
                  </div>
                  <div className="text-sm text-yellow-600 dark:text-yellow-400">
                    You&apos;re on the right track. Focus on reviewing incorrect
                    answers to improve.
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                <Target className="w-5 h-5 text-red-600" />
                <div>
                  <div className="font-medium text-red-800 dark:text-red-200">
                    Needs Improvement
                  </div>
                  <div className="text-sm text-red-600 dark:text-red-400">
                    Review the explanations and retake practice tests to improve
                    your accuracy.
                  </div>
                </div>
              </div>
            )}

            {completionPercentage >= 75 && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <Award className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-blue-800 dark:text-blue-200">
                    Almost There!
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    You&apos;re close to completing the entire course. Finish
                    strong!
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
