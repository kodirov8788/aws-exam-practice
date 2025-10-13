"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DomainCard } from "@/components/dashboard/DomainCard";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  BarChart3,
  Flag,
  Download,
  Upload,
  Settings,
} from "lucide-react";
import { Domain } from "@/lib/data/types";
import { scoringManager } from "@/lib/utils/scoring";
import { storageManager } from "@/lib/storage/localStorage";

export default function Dashboard() {
  const router = useRouter();
  const [userProgress, setUserProgress] = useState(
    storageManager.loadUserProgress()
  );
  const [overallStats, setOverallStats] = useState(
    scoringManager.getOverallProgress()
  );

  // Refresh data when component mounts or when returning from other pages
  useEffect(() => {
    const refreshData = () => {
      const progress = storageManager.loadUserProgress();
      const stats = scoringManager.getOverallProgress();
      setUserProgress(progress);
      setOverallStats(stats);
    };

    refreshData();

    // Listen for storage changes (if user opens multiple tabs)
    const handleStorageChange = () => {
      refreshData();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleDomainStart = (domain: Domain) => {
    router.push(`/practice/${domain}`);
  };

  const handleImportData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            storageManager.importData(data);
            // Refresh data after import
            setUserProgress(storageManager.loadUserProgress());
            setOverallStats(scoringManager.getOverallProgress());
          } catch {
            alert("Failed to import data. Please check the file format.");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExportData = () => {
    try {
      const data = storageManager.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `aws-exam-progress-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("Failed to export data.");
    }
  };

  const domains: Domain[] = [
    "cloud-concepts",
    "security-compliance",
    "technology-services",
    "billing-pricing",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                AWS Cloud Practitioner
              </h1>
              <p className="text-muted-foreground mt-1">
                Practice and master the AWS Cloud Practitioner certification
                exam
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/review")}
              >
                <Flag className="w-4 h-4 mr-2" />
                Review
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/stats")}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Stats
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={handleImportData}>
                <Upload className="w-4 h-4 mr-2" />
                Import Progress
              </Button>
              <Button variant="outline" onClick={handleExportData}>
                <Download className="w-4 h-4 mr-2" />
                Export Progress
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to clear all progress? This cannot be undone."
                    )
                  ) {
                    storageManager.clearAllData();
                    setUserProgress(storageManager.loadUserProgress());
                    setOverallStats(scoringManager.getOverallProgress());
                  }
                }}
              >
                Clear All Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Overall Stats */}
        <StatsOverview
          totalGroups={overallStats.totalGroups}
          completedGroups={overallStats.completedGroups}
          overallAccuracy={overallStats.overallAccuracy}
          totalQuestionsAnswered={overallStats.totalQuestionsAnswered}
          completionPercentage={overallStats.completionPercentage}
        />

        {/* Domain Cards */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Practice Domains</h2>
            <Badge variant="outline" className="text-sm">
              {overallStats.completedGroups} of {overallStats.totalGroups}{" "}
              completed
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {domains.map((domain) => {
              const domainProgress = scoringManager.getDomainProgress(domain);
              const isUnlocked = scoringManager.shouldUnlockGroup(
                domain,
                "beginner"
              );
              const bestScore = storageManager.getBestScoreForGroup(
                scoringManager.generateGroupId(domain, "beginner")
              );
              const lastAttempt =
                userProgress?.lastAttempt[
                  scoringManager.generateGroupId(domain, "beginner")
                ];

              return (
                <DomainCard
                  key={domain}
                  domain={domain}
                  isUnlocked={isUnlocked}
                  completedGroups={domainProgress.completedGroups}
                  totalGroups={domainProgress.totalGroups}
                  averageScore={domainProgress.averageScore}
                  bestScore={bestScore || undefined}
                  lastAttempt={lastAttempt}
                  onStart={() => handleDomainStart(domain)}
                />
              );
            })}
          </div>
        </div>

        {/* Getting Started Guide */}
        {overallStats.completedGroups === 0 && (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Welcome to the AWS Cloud Practitioner exam practice app!
                Here&apos;s how to get started:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    1
                  </div>
                  <span className="text-sm">
                    Start with any domain&apos;s beginner level questions
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    2
                  </div>
                  <span className="text-sm">
                    Achieve 80% or higher to unlock the next difficulty level
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    3
                  </div>
                  <span className="text-sm">
                    Flag questions for review and track your progress
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    4
                  </div>
                  <span className="text-sm">
                    Complete all domains to master the AWS Cloud Practitioner
                    exam
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
