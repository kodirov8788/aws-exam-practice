import {
  QuestionSession,
  ExamResult,
  UserProgress,
  Domain,
  Difficulty,
  UNLOCK_THRESHOLD,
} from "../data/types";
import { storageManager } from "../storage/localStorage";

export class ScoringManager {
  private static instance: ScoringManager;

  private constructor() {}

  static getInstance(): ScoringManager {
    if (!ScoringManager.instance) {
      ScoringManager.instance = new ScoringManager();
    }
    return ScoringManager.instance;
  }

  // Calculate score for a question session
  calculateScore(session: QuestionSession): ExamResult {
    const { questions, answers, startTime, flaggedQuestions } = session;
    const endTime = new Date();

    let correctAnswers = 0;
    const totalQuestions = questions.length;

    // Count correct answers
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score =
      totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
    const passed = score >= UNLOCK_THRESHOLD * 100;
    const timeSpent = endTime.getTime() - startTime.getTime();

    // Generate group ID
    const groupId = this.generateGroupId(
      questions[0]?.domain,
      questions[0]?.difficulty
    );

    return {
      groupId,
      score,
      totalQuestions,
      correctAnswers,
      timeSpent,
      passed,
      timestamp: endTime,
      answers: { ...answers },
      flaggedQuestions: Array.from(flaggedQuestions),
    };
  }

  // Check if a group should be unlocked
  shouldUnlockGroup(domain: Domain, difficulty: Difficulty): boolean {
    const groupId = this.generateGroupId(domain, difficulty);
    const userProgress = storageManager.loadUserProgress();

    // Beginner level is always unlocked
    if (difficulty === "beginner") {
      return true;
    }

    if (!userProgress) return false;

    // Check if group is already completed
    if (userProgress.completedGroups.includes(groupId)) {
      return true;
    }

    // Check if prerequisite groups are completed with 80% score
    return this.checkPrerequisites(domain, difficulty, userProgress);
  }

  // Check prerequisites for unlocking a group
  private checkPrerequisites(
    domain: Domain,
    difficulty: Difficulty,
    userProgress: UserProgress
  ): boolean {
    // Beginner level is always unlocked
    if (difficulty === "beginner") {
      return true;
    }

    // For intermediate level, check if beginner level is completed with 80% score
    if (difficulty === "intermediate") {
      const beginnerGroupId = this.generateGroupId(domain, "beginner");
      const beginnerScore = userProgress.scores[beginnerGroupId];
      return (
        beginnerScore !== undefined && beginnerScore >= UNLOCK_THRESHOLD * 100
      );
    }

    // For advanced level, check if intermediate level is completed with 80% score
    if (difficulty === "advanced") {
      const intermediateGroupId = this.generateGroupId(domain, "intermediate");
      const intermediateScore = userProgress.scores[intermediateGroupId];
      return (
        intermediateScore !== undefined &&
        intermediateScore >= UNLOCK_THRESHOLD * 100
      );
    }

    return false;
  }

  // Generate group ID from domain and difficulty
  generateGroupId(domain: Domain, difficulty: Difficulty): string {
    return `${domain}-${difficulty}`;
  }

  // Parse group ID to get domain and difficulty
  parseGroupId(
    groupId: string
  ): { domain: Domain; difficulty: Difficulty } | null {
    const parts = groupId.split("-");
    if (parts.length < 2) return null;

    const difficulty = parts[parts.length - 1] as Difficulty;
    const domain = parts.slice(0, -1).join("-") as Domain;

    // Validate domain and difficulty
    const validDomains: Domain[] = [
      "cloud-concepts",
      "security-compliance",
      "technology-services",
      "billing-pricing",
    ];
    const validDifficulties: Difficulty[] = [
      "beginner",
      "intermediate",
      "advanced",
    ];

    if (
      !validDomains.includes(domain) ||
      !validDifficulties.includes(difficulty)
    ) {
      return null;
    }

    return { domain, difficulty };
  }

  // Update user progress after completing an exam
  updateUserProgress(result: ExamResult): UserProgress {
    const currentProgress =
      storageManager.loadUserProgress() || this.getDefaultUserProgress();

    // Update scores
    const updatedScores = {
      ...currentProgress.scores,
      [result.groupId]: result.score,
    };

    // Update completed groups if passed
    const updatedCompletedGroups = [...currentProgress.completedGroups];
    if (result.passed && !updatedCompletedGroups.includes(result.groupId)) {
      updatedCompletedGroups.push(result.groupId);
    }

    // Update last attempt
    const updatedLastAttempt = {
      ...currentProgress.lastAttempt,
      [result.groupId]: result.timestamp,
    };

    const updatedProgress: UserProgress = {
      ...currentProgress,
      scores: updatedScores,
      completedGroups: updatedCompletedGroups,
      lastAttempt: updatedLastAttempt,
    };

    // Save updated progress
    storageManager.saveUserProgress(updatedProgress);

    // Update overall stats
    return storageManager.updateProgressStats();
  }

  // Get next unlockable group
  getNextUnlockableGroup(
    currentDomain: Domain,
    currentDifficulty: Difficulty
  ): { domain: Domain; difficulty: Difficulty } | null {
    const userProgress = storageManager.loadUserProgress();
    if (!userProgress) return null;

    // Check if there's a next difficulty level in the same domain
    const difficultyOrder: Difficulty[] = [
      "beginner",
      "intermediate",
      "advanced",
    ];
    const currentIndex = difficultyOrder.indexOf(currentDifficulty);

    if (currentIndex < difficultyOrder.length - 1) {
      const nextDifficulty = difficultyOrder[currentIndex + 1];
      if (this.shouldUnlockGroup(currentDomain, nextDifficulty)) {
        return { domain: currentDomain, difficulty: nextDifficulty };
      }
    }

    // Check other domains for beginner level
    const domains: Domain[] = [
      "cloud-concepts",
      "security-compliance",
      "technology-services",
      "billing-pricing",
    ];
    const currentDomainIndex = domains.indexOf(currentDomain);

    for (let i = 0; i < domains.length; i++) {
      if (i !== currentDomainIndex) {
        if (this.shouldUnlockGroup(domains[i], "beginner")) {
          return { domain: domains[i], difficulty: "beginner" };
        }
      }
    }

    return null;
  }

  // Get progress statistics for a domain
  getDomainProgress(domain: Domain): {
    totalGroups: number;
    completedGroups: number;
    averageScore: number;
    isFullyCompleted: boolean;
  } {
    const userProgress = storageManager.loadUserProgress();
    if (!userProgress) {
      return {
        totalGroups: 3,
        completedGroups: 0,
        averageScore: 0,
        isFullyCompleted: false,
      };
    }

    const difficulties: Difficulty[] = ["beginner", "intermediate", "advanced"];
    let completedGroups = 0;
    let totalScore = 0;
    let scoredGroups = 0;

    difficulties.forEach((difficulty) => {
      const groupId = this.generateGroupId(domain, difficulty);
      if (userProgress.completedGroups.includes(groupId)) {
        completedGroups++;
      }
      if (userProgress.scores[groupId] !== undefined) {
        totalScore += userProgress.scores[groupId];
        scoredGroups++;
      }
    });

    const averageScore = scoredGroups > 0 ? totalScore / scoredGroups : 0;
    const isFullyCompleted = completedGroups === 3;

    return {
      totalGroups: 3,
      completedGroups,
      averageScore,
      isFullyCompleted,
    };
  }

  // Get overall progress statistics
  getOverallProgress(): {
    totalGroups: number;
    completedGroups: number;
    overallAccuracy: number;
    totalQuestionsAnswered: number;
    completionPercentage: number;
  } {
    const userProgress = storageManager.loadUserProgress();
    if (!userProgress) {
      return {
        totalGroups: 12, // 4 domains × 3 difficulties
        completedGroups: 0,
        overallAccuracy: 0,
        totalQuestionsAnswered: 0,
        completionPercentage: 0,
      };
    }

    const totalGroups = 12; // 4 domains × 3 difficulties
    const completedGroups = userProgress.completedGroups.length;
    const completionPercentage = (completedGroups / totalGroups) * 100;

    return {
      totalGroups,
      completedGroups,
      overallAccuracy: userProgress.overallAccuracy,
      totalQuestionsAnswered: userProgress.totalQuestionsAnswered,
      completionPercentage,
    };
  }

  // Check if user has achieved a milestone
  checkMilestones(): {
    firstGroupCompleted: boolean;
    firstDomainCompleted: boolean;
    halfWayCompleted: boolean;
    allCompleted: boolean;
  } {
    const overallProgress = this.getOverallProgress();

    return {
      firstGroupCompleted: overallProgress.completedGroups >= 1,
      firstDomainCompleted: overallProgress.completedGroups >= 3,
      halfWayCompleted: overallProgress.completedGroups >= 6,
      allCompleted: overallProgress.completedGroups >= 12,
    };
  }

  // Get performance insights
  getPerformanceInsights(): {
    strongestDomain: Domain | null;
    weakestDomain: Domain | null;
    improvementAreas: Domain[];
    recentPerformance: "improving" | "declining" | "stable";
  } {
    const userProgress = storageManager.loadUserProgress();
    if (!userProgress) {
      return {
        strongestDomain: null,
        weakestDomain: null,
        improvementAreas: [],
        recentPerformance: "stable",
      };
    }

    const domains: Domain[] = [
      "cloud-concepts",
      "security-compliance",
      "technology-services",
      "billing-pricing",
    ];
    const domainScores: { domain: Domain; averageScore: number }[] = [];

    domains.forEach((domain) => {
      const progress = this.getDomainProgress(domain);
      domainScores.push({ domain, averageScore: progress.averageScore });
    });

    // Sort by average score
    domainScores.sort((a, b) => b.averageScore - a.averageScore);

    const strongestDomain =
      domainScores.length > 0 && domainScores[0].averageScore > 0
        ? domainScores[0].domain
        : null;
    const weakestDomain =
      domainScores.length > 0 &&
      domainScores[domainScores.length - 1].averageScore > 0
        ? domainScores[domainScores.length - 1].domain
        : null;

    // Find improvement areas (domains with score < 80%)
    const improvementAreas = domainScores
      .filter(
        (d) => d.averageScore > 0 && d.averageScore < UNLOCK_THRESHOLD * 100
      )
      .map((d) => d.domain);

    // Analyze recent performance (simplified - could be enhanced with time-based analysis)
    const recentPerformance: "improving" | "declining" | "stable" = "stable";

    return {
      strongestDomain,
      weakestDomain,
      improvementAreas,
      recentPerformance,
    };
  }

  // Helper method to get default user progress
  private getDefaultUserProgress(): UserProgress {
    return {
      completedGroups: [],
      scores: {},
      flaggedQuestions: [],
      lastAttempt: {},
      totalQuestionsAnswered: 0,
      overallAccuracy: 0,
    };
  }

  // Format score for display
  formatScore(score: number): string {
    return `${score.toFixed(1)}%`;
  }

  // Format time for display
  formatTime(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  }

  // Get score color based on performance
  getScoreColor(score: number): string {
    if (score >= UNLOCK_THRESHOLD * 100) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  }

  // Get score badge variant
  getScoreBadgeVariant(score: number): "default" | "secondary" | "destructive" {
    if (score >= UNLOCK_THRESHOLD * 100) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  }
}

// Export singleton instance
export const scoringManager = ScoringManager.getInstance();
