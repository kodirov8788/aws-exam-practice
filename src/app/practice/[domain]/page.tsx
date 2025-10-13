"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Lock,
  Unlock,
  CheckCircle,
  Clock,
  Trophy,
  Target,
} from "lucide-react";
import {
  Domain,
  Difficulty,
  DOMAIN_INFO,
  DIFFICULTY_INFO,
} from "@/lib/data/types";
import { scoringManager } from "@/lib/utils/scoring";
import { storageManager } from "@/lib/storage/localStorage";
import { getQuestionsByDomainAndDifficulty } from "@/lib/data/questions";

export default function DomainPage() {
  const router = useRouter();
  const params = useParams();
  const domain = params.domain as Domain;

  const [userProgress, setUserProgress] = useState(
    storageManager.loadUserProgress()
  );
  const [domainProgress, setDomainProgress] = useState(
    scoringManager.getDomainProgress(domain)
  );

  useEffect(() => {
    const progress = storageManager.loadUserProgress();
    const domainStats = scoringManager.getDomainProgress(domain);
    setUserProgress(progress);
    setDomainProgress(domainStats);
  }, [domain]);

  if (!domain || !DOMAIN_INFO[domain]) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Invalid Domain</h1>
          <p className="text-muted-foreground mt-2">
            The requested domain does not exist.
          </p>
          <Button onClick={() => router.push("/")} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const domainInfo = DOMAIN_INFO[domain];
  const difficulties: Difficulty[] = ["beginner", "intermediate", "advanced"];

  const handleDifficultySelect = (difficulty: Difficulty) => {
    router.push(`/practice/${domain}/${difficulty}`);
  };

  const handleBack = () => {
    router.push("/");
  };

  const getDifficultyStatus = (difficulty: Difficulty) => {
    const isUnlocked = scoringManager.shouldUnlockGroup(domain, difficulty);
    const groupId = scoringManager.generateGroupId(domain, difficulty);
    const isCompleted =
      userProgress?.completedGroups.includes(groupId) || false;
    const bestScore = storageManager.getBestScoreForGroup(groupId);
    const lastAttempt = userProgress?.lastAttempt[groupId];
    const questionCount = getQuestionsByDomainAndDifficulty(
      domain,
      difficulty
    ).length;

    return {
      isUnlocked,
      isCompleted,
      bestScore,
      lastAttempt,
      questionCount,
    };
  };

  const formatLastAttempt = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

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
                  {domainInfo.name}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {domainInfo.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {domainInfo.weight}% of exam
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {domainProgress.completedGroups}/{domainProgress.totalGroups}{" "}
                completed
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Domain Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Domain Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium">
                  {domainProgress.completedGroups} of{" "}
                  {domainProgress.totalGroups} difficulty levels completed
                </span>
              </div>
              <Progress
                value={
                  (domainProgress.completedGroups /
                    domainProgress.totalGroups) *
                  100
                }
                className="h-3"
              />
              <div className="text-xs text-muted-foreground">
                {(
                  (domainProgress.completedGroups /
                    domainProgress.totalGroups) *
                  100
                ).toFixed(0)}
                % complete
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {domainProgress.averageScore > 0
                    ? `${domainProgress.averageScore.toFixed(0)}%`
                    : "--"}
                </div>
                <div className="text-xs text-muted-foreground">
                  Average Score
                </div>
              </div>

              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {domainProgress.completedGroups}
                </div>
                <div className="text-xs text-muted-foreground">
                  Levels Completed
                </div>
              </div>

              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {domainProgress.isFullyCompleted ? "Yes" : "No"}
                </div>
                <div className="text-xs text-muted-foreground">
                  Domain Mastered
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Difficulty Levels */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Difficulty Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {difficulties.map((difficulty) => {
              const status = getDifficultyStatus(difficulty);
              const difficultyInfo = DIFFICULTY_INFO[difficulty];

              return (
                <Card
                  key={difficulty}
                  className={`transition-all duration-200 hover:shadow-md ${
                    !status.isUnlocked ? "opacity-60" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {status.isUnlocked ? (
                          <Unlock className="w-5 h-5 text-green-600" />
                        ) : (
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        )}
                        <CardTitle className="text-lg font-semibold">
                          {difficultyInfo.name}
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        {status.isCompleted && (
                          <Trophy className="w-5 h-5 text-yellow-600" />
                        )}
                        <Badge variant="outline" className="text-xs">
                          {status.questionCount} questions
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {difficultyInfo.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-background/50 rounded-lg">
                        <div
                          className={cn(
                            "text-lg font-bold",
                            status.bestScore
                              ? scoringManager.getScoreColor(status.bestScore)
                              : "text-muted-foreground"
                          )}
                        >
                          {status.bestScore
                            ? `${status.bestScore.toFixed(0)}%`
                            : "--"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Best Score
                        </div>
                      </div>

                      <div className="text-center p-3 bg-background/50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">
                          {status.isCompleted ? "Yes" : "No"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Completed
                        </div>
                      </div>
                    </div>

                    {/* Last Attempt */}
                    {status.lastAttempt && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>
                          Last attempt: {formatLastAttempt(status.lastAttempt)}
                        </span>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      onClick={() => handleDifficultySelect(difficulty)}
                      disabled={!status.isUnlocked}
                      className={cn(
                        "w-full",
                        !status.isUnlocked ? "cursor-not-allowed" : ""
                      )}
                      variant={status.isUnlocked ? "default" : "secondary"}
                    >
                      {!status.isUnlocked ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Locked
                        </>
                      ) : status.isCompleted ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Review
                        </>
                      ) : (
                        <>Start Practice</>
                      )}
                    </Button>

                    {/* Lock Message */}
                    {!status.isUnlocked && (
                      <div className="text-xs text-muted-foreground text-center">
                        {difficulty === "beginner"
                          ? "Available to start"
                          : `Complete ${
                              difficulties[difficulties.indexOf(difficulty) - 1]
                            } level with 80% to unlock`}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Study Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Study Tips for {domainInfo.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {domain === "cloud-concepts" && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Focus on understanding the fundamental concepts of cloud
                    computing, including the benefits, deployment models, and
                    service models.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pay special attention to the differences between on-premises
                    and cloud computing, and the various pricing models
                    available.
                  </p>
                </>
              )}
              {domain === "security-compliance" && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Understand the shared responsibility model and know what AWS
                    is responsible for versus what you are responsible for.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Learn about AWS security services like IAM, KMS, and
                    CloudTrail, and how they work together to secure your
                    infrastructure.
                  </p>
                </>
              )}
              {domain === "technology-services" && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Focus on the core AWS services like EC2, S3, RDS, and
                    Lambda, and understand their primary use cases.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Learn about the different types of storage, compute, and
                    networking services available in AWS.
                  </p>
                </>
              )}
              {domain === "billing-pricing" && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Understand the different pricing models: On-Demand, Reserved
                    Instances, Spot Instances, and Savings Plans.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Learn about AWS cost optimization tools and services like
                    Cost Explorer, Budgets, and Trusted Advisor.
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
