import {
  UserProgress,
  Question,
  ImportExportData,
  ExamResult,
} from "../data/types";

const STORAGE_KEYS = {
  USER_PROGRESS: "aws-exam-user-progress",
  EXAM_RESULTS: "aws-exam-results",
  FLAGGED_QUESTIONS: "aws-exam-flagged-questions",
  CUSTOM_QUESTIONS: "aws-exam-custom-questions",
} as const;

export class LocalStorageManager {
  private static instance: LocalStorageManager;

  private constructor() {}

  static getInstance(): LocalStorageManager {
    if (!LocalStorageManager.instance) {
      LocalStorageManager.instance = new LocalStorageManager();
    }
    return LocalStorageManager.instance;
  }

  // User Progress Management
  saveUserProgress(progress: UserProgress): void {
    try {
      if (typeof window === "undefined") return;

      localStorage.setItem(
        STORAGE_KEYS.USER_PROGRESS,
        JSON.stringify(progress)
      );
    } catch (error) {
      console.error("Failed to save user progress:", error);
      throw new Error("Failed to save progress to local storage");
    }
  }

  loadUserProgress(): UserProgress | null {
    try {
      if (typeof window === "undefined") return null;

      const stored = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
      if (!stored) return null;

      const progress = JSON.parse(stored);
      // Convert date strings back to Date objects
      Object.keys(progress.lastAttempt).forEach((key) => {
        progress.lastAttempt[key] = new Date(progress.lastAttempt[key]);
      });

      return progress;
    } catch (error) {
      console.error("Failed to load user progress:", error);
      return null;
    }
  }

  updateUserProgress(updates: Partial<UserProgress>): UserProgress {
    const currentProgress =
      this.loadUserProgress() || this.getDefaultUserProgress();
    const updatedProgress = { ...currentProgress, ...updates };
    this.saveUserProgress(updatedProgress);
    return updatedProgress;
  }

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

  // Exam Results Management
  saveExamResult(result: ExamResult): void {
    try {
      if (typeof window === "undefined") return;

      const existingResults = this.loadExamResults();
      const updatedResults = [...existingResults, result];
      localStorage.setItem(
        STORAGE_KEYS.EXAM_RESULTS,
        JSON.stringify(updatedResults)
      );
    } catch (error) {
      console.error("Failed to save exam result:", error);
      throw new Error("Failed to save exam result to local storage");
    }
  }

  loadExamResults(): ExamResult[] {
    try {
      if (typeof window === "undefined") return [];

      const stored = localStorage.getItem(STORAGE_KEYS.EXAM_RESULTS);
      if (!stored) return [];

      const results = JSON.parse(stored);
      // Convert date strings back to Date objects
      return results.map((result: ExamResult & { timestamp: string }) => ({
        ...result,
        timestamp: new Date(result.timestamp),
      }));
    } catch (error) {
      console.error("Failed to load exam results:", error);
      return [];
    }
  }

  getExamResultsByGroup(groupId: string): ExamResult[] {
    const allResults = this.loadExamResults();
    return allResults.filter((result) => result.groupId === groupId);
  }

  getBestScoreForGroup(groupId: string): number | null {
    const groupResults = this.getExamResultsByGroup(groupId);
    if (groupResults.length === 0) return null;

    return Math.max(...groupResults.map((result) => result.score));
  }

  // Flagged Questions Management
  addFlaggedQuestion(questionId: string): void {
    try {
      if (typeof window === "undefined") return;

      const flagged = this.loadFlaggedQuestions();
      if (!flagged.includes(questionId)) {
        flagged.push(questionId);
        localStorage.setItem(
          STORAGE_KEYS.FLAGGED_QUESTIONS,
          JSON.stringify(flagged)
        );
      }
    } catch (error) {
      console.error("Failed to add flagged question:", error);
      throw new Error("Failed to flag question");
    }
  }

  removeFlaggedQuestion(questionId: string): void {
    try {
      if (typeof window === "undefined") return;

      const flagged = this.loadFlaggedQuestions();
      const updated = flagged.filter((id) => id !== questionId);
      localStorage.setItem(
        STORAGE_KEYS.FLAGGED_QUESTIONS,
        JSON.stringify(updated)
      );
    } catch (error) {
      console.error("Failed to remove flagged question:", error);
      throw new Error("Failed to unflag question");
    }
  }

  loadFlaggedQuestions(): string[] {
    try {
      if (typeof window === "undefined") return [];

      const stored = localStorage.getItem(STORAGE_KEYS.FLAGGED_QUESTIONS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load flagged questions:", error);
      return [];
    }
  }

  isQuestionFlagged(questionId: string): boolean {
    const flagged = this.loadFlaggedQuestions();
    return flagged.includes(questionId);
  }

  // Custom Questions Management
  saveCustomQuestions(questions: Question[]): void {
    try {
      if (typeof window === "undefined") return;

      localStorage.setItem(
        STORAGE_KEYS.CUSTOM_QUESTIONS,
        JSON.stringify(questions)
      );
    } catch (error) {
      console.error("Failed to save custom questions:", error);
      throw new Error("Failed to save custom questions to local storage");
    }
  }

  loadCustomQuestions(): Question[] {
    try {
      if (typeof window === "undefined") return [];

      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_QUESTIONS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load custom questions:", error);
      return [];
    }
  }

  addCustomQuestion(question: Question): void {
    try {
      const customQuestions = this.loadCustomQuestions();
      customQuestions.push(question);
      this.saveCustomQuestions(customQuestions);
    } catch (error) {
      console.error("Failed to add custom question:", error);
      throw new Error("Failed to add custom question");
    }
  }

  // Import/Export functionality
  exportData(): ImportExportData {
    try {
      const userProgress = this.loadUserProgress();
      const customQuestions = this.loadCustomQuestions();

      return {
        questions: customQuestions,
        userProgress: userProgress || undefined,
        version: "1.0.0",
        exportedAt: new Date(),
      };
    } catch (error) {
      console.error("Failed to export data:", error);
      throw new Error("Failed to export data");
    }
  }

  importData(data: ImportExportData): void {
    try {
      // Validate imported data
      if (!data.version || !data.exportedAt) {
        throw new Error("Invalid import data format");
      }

      // Import custom questions
      if (data.questions && Array.isArray(data.questions)) {
        const existingCustom = this.loadCustomQuestions();
        const mergedQuestions = [...existingCustom, ...data.questions];
        this.saveCustomQuestions(mergedQuestions);
      }

      // Import user progress (optional)
      if (data.userProgress) {
        const currentProgress =
          this.loadUserProgress() || this.getDefaultUserProgress();
        const mergedProgress = {
          ...currentProgress,
          ...data.userProgress,
          // Merge arrays to avoid overwriting
          completedGroups: [
            ...new Set([
              ...currentProgress.completedGroups,
              ...(data.userProgress.completedGroups || []),
            ]),
          ],
          flaggedQuestions: [
            ...new Set([
              ...currentProgress.flaggedQuestions,
              ...(data.userProgress.flaggedQuestions || []),
            ]),
          ],
          // Merge scores
          scores: { ...currentProgress.scores, ...data.userProgress.scores },
          lastAttempt: {
            ...currentProgress.lastAttempt,
            ...data.userProgress.lastAttempt,
          },
        };
        this.saveUserProgress(mergedProgress);
      }
    } catch (error) {
      console.error("Failed to import data:", error);
      throw new Error("Failed to import data");
    }
  }

  // Utility methods
  clearAllData(): void {
    try {
      if (typeof window === "undefined") return;

      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error("Failed to clear all data:", error);
      throw new Error("Failed to clear data");
    }
  }

  getStorageSize(): { used: number; available: number } {
    try {
      if (typeof window === "undefined") return { used: 0, available: 0 };

      let used = 0;
      Object.values(STORAGE_KEYS).forEach((key) => {
        const item = localStorage.getItem(key);
        if (item) {
          used += item.length;
        }
      });

      // Estimate available space (most browsers have 5-10MB limit)
      const estimatedLimit = 5 * 1024 * 1024; // 5MB
      const available = estimatedLimit - used;

      return { used, available };
    } catch (error) {
      console.error("Failed to calculate storage size:", error);
      return { used: 0, available: 0 };
    }
  }

  // Progress calculation helpers
  calculateOverallAccuracy(): number {
    const results = this.loadExamResults();
    if (results.length === 0) return 0;

    const totalQuestions = results.reduce(
      (sum, result) => sum + result.totalQuestions,
      0
    );
    const totalCorrect = results.reduce(
      (sum, result) => sum + result.correctAnswers,
      0
    );

    return totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
  }

  getTotalQuestionsAnswered(): number {
    const results = this.loadExamResults();
    return results.reduce((sum, result) => sum + result.totalQuestions, 0);
  }

  updateProgressStats(): UserProgress {
    const currentProgress =
      this.loadUserProgress() || this.getDefaultUserProgress();
    const updatedProgress = {
      ...currentProgress,
      totalQuestionsAnswered: this.getTotalQuestionsAnswered(),
      overallAccuracy: this.calculateOverallAccuracy(),
    };

    this.saveUserProgress(updatedProgress);
    return updatedProgress;
  }
}

// Export singleton instance
export const storageManager = LocalStorageManager.getInstance();
