"use client";

import { Domain, DOMAIN_INFO } from "@/lib/data/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Lock,
  Unlock,
  CheckCircle,
  Clock,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DomainCardProps {
  domain: Domain;
  isUnlocked: boolean;
  completedGroups: number;
  totalGroups: number;
  averageScore: number;
  bestScore?: number;
  lastAttempt?: Date;
  onStart: () => void;
  className?: string;
}

export function DomainCard({
  domain,
  isUnlocked,
  completedGroups,
  totalGroups,
  averageScore,
  bestScore,
  lastAttempt,
  onStart,
  className,
}: DomainCardProps) {
  const domainInfo = DOMAIN_INFO[domain];
  const completionPercentage = (completedGroups / totalGroups) * 100;
  const isFullyCompleted = completedGroups === totalGroups;

  const getDomainColor = (color: string) => {
    switch (color) {
      case "blue":
        return "border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800";
      case "red":
        return "border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800";
      case "green":
        return "border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800";
      case "yellow":
        return "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800";
      default:
        return "border-gray-200 bg-gray-50 dark:bg-gray-950/20 dark:border-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
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
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        !isUnlocked && "opacity-60",
        getDomainColor(domainInfo.color),
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isUnlocked ? (
              <Unlock className="w-5 h-5 text-green-600" />
            ) : (
              <Lock className="w-5 h-5 text-muted-foreground" />
            )}
            <CardTitle className="text-lg font-semibold">
              {domainInfo.name}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {isFullyCompleted && <Trophy className="w-5 h-5 text-yellow-600" />}
            <Badge variant="outline" className="text-xs">
              {domainInfo.weight}% of exam
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {domainInfo.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {completedGroups} of {totalGroups} groups completed
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {completionPercentage.toFixed(0)}% complete
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div
              className={cn("text-lg font-bold", getScoreColor(averageScore))}
            >
              {averageScore > 0 ? `${averageScore.toFixed(0)}%` : "--"}
            </div>
            <div className="text-xs text-muted-foreground">Average Score</div>
          </div>

          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div
              className={cn(
                "text-lg font-bold",
                bestScore ? getScoreColor(bestScore) : "text-muted-foreground"
              )}
            >
              {bestScore ? `${bestScore.toFixed(0)}%` : "--"}
            </div>
            <div className="text-xs text-muted-foreground">Best Score</div>
          </div>
        </div>

        {/* Last Attempt */}
        {lastAttempt && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Last attempt: {formatLastAttempt(lastAttempt)}</span>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={onStart}
          disabled={!isUnlocked}
          className={cn("w-full", !isUnlocked && "cursor-not-allowed")}
          variant={isUnlocked ? "default" : "secondary"}
        >
          {!isUnlocked ? (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Locked
            </>
          ) : isFullyCompleted ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Review
            </>
          ) : (
            <>
              Start Practice
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>

        {/* Lock Message */}
        {!isUnlocked && (
          <div className="text-xs text-muted-foreground text-center">
            Complete previous difficulty levels to unlock
          </div>
        )}
      </CardContent>
    </Card>
  );
}
