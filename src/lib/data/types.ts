export type Domain =
  | "cloud-concepts"
  | "security-compliance"
  | "technology-services"
  | "billing-pricing";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Question {
  id: string;
  domain: Domain;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tags: string[];
}

export interface UserProgress {
  completedGroups: string[];
  scores: Record<string, number>;
  flaggedQuestions: string[];
  lastAttempt: Record<string, Date>;
  totalQuestionsAnswered: number;
  overallAccuracy: number;
}

export interface QuestionSession {
  questions: Question[];
  currentIndex: number;
  answers: Record<number, number>;
  flaggedQuestions: Set<number>;
  startTime: Date;
  endTime?: Date;
}

export interface QuestionGroup {
  id: string;
  domain: Domain;
  difficulty: Difficulty;
  questions: Question[];
  isUnlocked: boolean;
  bestScore?: number;
  lastAttempt?: Date;
}

export interface ExamResult {
  groupId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  passed: boolean;
  timestamp: Date;
  answers: Record<number, number>;
  flaggedQuestions: number[];
}

export interface DomainStats {
  domain: Domain;
  totalQuestions: number;
  answeredQuestions: number;
  accuracy: number;
  timeSpent: number;
  weakAreas: string[];
}

export interface ImportExportData {
  questions: Question[];
  userProgress?: UserProgress;
  version: string;
  exportedAt: Date;
}

export const DOMAIN_INFO = {
  "cloud-concepts": {
    name: "Cloud Concepts",
    description:
      "Understanding of cloud computing concepts and AWS value proposition",
    weight: 24,
    color: "blue",
  },
  "security-compliance": {
    name: "Security & Compliance",
    description: "AWS shared responsibility model and security best practices",
    weight: 30,
    color: "red",
  },
  "technology-services": {
    name: "Cloud Technology & Services",
    description: "Core AWS services and their use cases",
    weight: 34,
    color: "green",
  },
  "billing-pricing": {
    name: "Billing & Pricing",
    description: "AWS pricing models, billing, and cost optimization",
    weight: 12,
    color: "yellow",
  },
} as const;

export const DIFFICULTY_INFO = {
  beginner: {
    name: "Beginner",
    description: "Basic concepts and fundamental knowledge",
    color: "green",
  },
  intermediate: {
    name: "Intermediate",
    description: "Practical application and common scenarios",
    color: "yellow",
  },
  advanced: {
    name: "Advanced",
    description: "Complex scenarios and edge cases",
    color: "red",
  },
} as const;

export const UNLOCK_THRESHOLD = 0.8; // 80% score required to unlock next group
