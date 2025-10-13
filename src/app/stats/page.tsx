"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  Award,
  Download,
  Calendar,
} from "lucide-react";
import { Domain, DOMAIN_INFO } from "@/lib/data/types";
import { scoringManager } from "@/lib/utils/scoring";
import { storageManager } from "@/lib/storage/localStorage";
import { cn } from "@/lib/utils";

export default function StatsPage() {
  const router = useRouter();
  const [userProgress, setUserProgress] = useState(
    storageManager.loadUserProgress()
  );
  const [overallStats, setOverallStats] = useState(
    scoringManager.getOverallProgress()
  );
  const [performanceInsights, setPerformanceInsights] = useState(
    scoringManager.getPerformanceInsights()
  );
  const [examResults, setExamResults] = useState(
    storageManager.loadExamResults()
  );

  useEffect(() => {
    const refreshData = () => {
      const progress = storageManager.loadUserProgress();
      const stats = scoringManager.getOverallProgress();
      const insights = scoringManager.getPerformanceInsights();
      const results = storageManager.loadExamResults();

      setUserProgress(progress);
      setOverallStats(stats);
      setPerformanceInsights(insights);
      setExamResults(results);
    };

    refreshData();

    // Listen for storage changes
    const handleStorageChange = () => {
      refreshData();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleBack = () => {
    router.push("/");
  };

  const handleExportStats = () => {
    try {
      const statsData = {
        overallStats,
        performanceInsights,
        examResults,
        userProgress,
        exportedAt: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(statsData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `aws-exam-stats-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("Failed to export statistics.");
    }
  };

  const domains: Domain[] = [
    "cloud-concepts",
    "security-compliance",
    "technology-services",
    "billing-pricing",
  ];

  // Calculate recent activity (last 7 days)
  const recentResults = examResults.filter((result) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return result.timestamp > sevenDaysAgo;
  });

  // Calculate average time per question
  const averageTimePerQuestion =
    examResults.length > 0
      ? examResults.reduce(
          (sum, result) => sum + result.timeSpent / result.totalQuestions,
          0
        ) / examResults.length
      : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Statistics
                </h1>
                <p className="text-muted-foreground mt-1">
                  Track your progress and performance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExportStats}>
                <Download className="w-4 h-4 mr-2" />
                Export Stats
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Overall Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      scoringManager.getScoreColor(overallStats.overallAccuracy)
                    )}
                  >
                    {overallStats.overallAccuracy.toFixed(1)}%
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
                    Tests Completed
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {examResults.length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
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
                  <p className="text-2xl font-bold text-green-600">
                    {overallStats.totalQuestionsAnswered}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg. Time/Question
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {Math.round(averageTimePerQuestion / 1000)}s
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Domain Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Domain Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {domains.map((domain) => {
                const domainInfo = DOMAIN_INFO[domain];
                const domainProgress = scoringManager.getDomainProgress(domain);
                const domainResults = examResults.filter((result) => {
                  const parsed = scoringManager.parseGroupId(result.groupId);
                  return parsed?.domain === domain;
                });

                const domainAccuracy =
                  domainResults.length > 0
                    ? domainResults.reduce(
                        (sum, result) => sum + result.score,
                        0
                      ) / domainResults.length
                    : 0;

                return (
                  <div key={domain} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{domainInfo.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {domainInfo.weight}% of exam
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {domainProgress.completedGroups}/
                          {domainProgress.totalGroups} completed
                        </span>
                        <span
                          className={cn(
                            "font-semibold",
                            scoringManager.getScoreColor(domainAccuracy)
                          )}
                        >
                          {domainAccuracy > 0
                            ? `${domainAccuracy.toFixed(1)}%`
                            : "--"}
                        </span>
                      </div>
                    </div>

                    <Progress
                      value={
                        (domainProgress.completedGroups /
                          domainProgress.totalGroups) *
                        100
                      }
                      className="h-2"
                    />

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <div className="font-semibold">
                          {domainResults.length}
                        </div>
                        <div className="text-muted-foreground">Tests Taken</div>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <div className="font-semibold">
                          {domainResults.filter((r) => r.passed).length}
                        </div>
                        <div className="text-muted-foreground">Passed</div>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <div className="font-semibold">
                          {domainResults.length > 0
                            ? Math.round(
                                domainResults.reduce(
                                  (sum, r) => sum + r.timeSpent,
                                  0
                                ) /
                                  domainResults.length /
                                  1000
                              )
                            : 0}
                          s
                        </div>
                        <div className="text-muted-foreground">Avg. Time</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Activity (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentResults.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No Recent Activity
                </h3>
                <p className="text-muted-foreground">
                  You haven&apos;t taken any tests in the last 7 days. Start
                  practicing to see your activity here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentResults
                  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                  .slice(0, 10)
                  .map((result, index) => {
                    const parsed = scoringManager.parseGroupId(result.groupId);
                    const domainInfo = parsed
                      ? DOMAIN_INFO[parsed.domain]
                      : null;

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "w-3 h-3 rounded-full",
                              result.passed ? "bg-green-500" : "bg-red-500"
                            )}
                          />
                          <div>
                            <div className="font-medium">
                              {domainInfo?.name} - {parsed?.difficulty}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {result.timestamp.toLocaleDateString()} at{" "}
                              {result.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div
                              className={cn(
                                "font-semibold",
                                scoringManager.getScoreColor(result.score)
                              )}
                            >
                              {result.score.toFixed(1)}%
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {result.correctAnswers}/{result.totalQuestions}
                            </div>
                          </div>
                          <Badge
                            variant={result.passed ? "default" : "destructive"}
                          >
                            {result.passed ? "Passed" : "Failed"}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
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
          <CardContent className="space-y-4">
            {performanceInsights.strongestDomain && (
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <Award className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium text-green-800 dark:text-green-200">
                    Strongest Domain
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    {DOMAIN_INFO[performanceInsights.strongestDomain].name} -
                    Keep up the excellent work!
                  </div>
                </div>
              </div>
            )}

            {performanceInsights.weakestDomain && (
              <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <Target className="w-5 h-5 text-yellow-600" />
                <div>
                  <div className="font-medium text-yellow-800 dark:text-yellow-200">
                    Focus Area
                  </div>
                  <div className="text-sm text-yellow-600 dark:text-yellow-400">
                    {DOMAIN_INFO[performanceInsights.weakestDomain].name} -
                    Consider additional practice in this domain.
                  </div>
                </div>
              </div>
            )}

            {performanceInsights.improvementAreas.length > 0 && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-blue-800 dark:text-blue-200">
                    Improvement Areas
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    Focus on:{" "}
                    {performanceInsights.improvementAreas
                      .map((domain) => DOMAIN_INFO[domain].name)
                      .join(", ")}
                  </div>
                </div>
              </div>
            )}

            {overallStats.overallAccuracy >= 80 && (
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <Award className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium text-green-800 dark:text-green-200">
                    Excellent Performance!
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    You&apos;re maintaining a strong accuracy rate. You&apos;re
                    well-prepared for the AWS Cloud Practitioner exam!
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
