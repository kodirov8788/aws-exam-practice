"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { QuestionCard } from "@/components/exam/QuestionCard";
import { ProgressBar } from "@/components/exam/ProgressBar";
import { ResultsSummary } from "@/components/exam/ResultsSummary";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle, Clock } from "lucide-react";
import {
  Domain,
  Difficulty,
  Question,
  QuestionSession,
  ExamResult,
} from "@/lib/data/types";
import { getQuestionsByDomainAndDifficulty } from "@/lib/data/questions";
import { scoringManager } from "@/lib/utils/scoring";
import { storageManager } from "@/lib/storage/localStorage";

export default function PracticePage() {
  const router = useRouter();
  const params = useParams();
  const domain = params.domain as Domain;
  const difficulty = params.difficulty as Difficulty;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [session, setSession] = useState<QuestionSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>();
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);

  // Initialize session
  useEffect(() => {
    const initializeSession = () => {
      const domainQuestions = getQuestionsByDomainAndDifficulty(
        domain,
        difficulty
      );

      if (domainQuestions.length === 0) {
        router.push("/");
        return;
      }

      // Check if group is unlocked
      if (!scoringManager.shouldUnlockGroup(domain, difficulty)) {
        router.push(`/practice/${domain}`);
        return;
      }

      // Shuffle questions for variety
      const shuffledQuestions = [...domainQuestions].sort(
        () => Math.random() - 0.5
      );

      const newSession: QuestionSession = {
        questions: shuffledQuestions,
        currentIndex: 0,
        answers: {},
        flaggedQuestions: new Set(),
        startTime: new Date(),
      };

      setQuestions(shuffledQuestions);
      setSession(newSession);
      setIsLoading(false);
    };

    initializeSession();
  }, [domain, difficulty, router]);

  const handleAnswerSelect = useCallback(
    (answerIndex: number) => {
      if (!session) return;

      setSelectedAnswer(answerIndex);
      setShowExplanation(true);
      setSession((prev) =>
        prev
          ? {
              ...prev,
              answers: {
                ...prev.answers,
                [currentIndex]: answerIndex,
              },
            }
          : null
      );
    },
    [session, currentIndex]
  );

  const handleFlagToggle = useCallback(() => {
    if (!session) return;

    const newFlaggedQuestions = new Set(session.flaggedQuestions);
    if (newFlaggedQuestions.has(currentIndex)) {
      newFlaggedQuestions.delete(currentIndex);
    } else {
      newFlaggedQuestions.add(currentIndex);
    }

    setSession((prev) =>
      prev
        ? {
            ...prev,
            flaggedQuestions: newFlaggedQuestions,
          }
        : null
    );
  }, [session, currentIndex]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswer(session?.answers[currentIndex - 1]);
      // Show explanation if this question was already answered
      setShowExplanation(session?.answers[currentIndex - 1] !== undefined);
    }
  }, [currentIndex, session]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(session?.answers[currentIndex + 1]);
      // Show explanation if this question was already answered
      setShowExplanation(session?.answers[currentIndex + 1] !== undefined);
    }
  }, [currentIndex, questions.length, session]);

  const handleSubmit = useCallback(() => {
    if (!session) return;

    const finalSession: QuestionSession = {
      ...session,
      endTime: new Date(),
    };

    const examResult = scoringManager.calculateScore(finalSession);
    setResult(examResult);
    setShowResults(true);

    // Save result and update progress
    storageManager.saveExamResult(examResult);
    scoringManager.updateUserProgress(examResult);
  }, [session]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showResults || !session) return;

      switch (e.key) {
        case "1":
        case "2":
        case "3":
        case "4":
          const answerIndex = parseInt(e.key) - 1;
          if (answerIndex < questions[currentIndex]?.options.length) {
            handleAnswerSelect(answerIndex);
          }
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
        case " ":
          e.preventDefault();
          handleNext();
          break;
        case "Enter":
          e.preventDefault();
          if (currentIndex === questions.length - 1) {
            handleSubmit();
          } else {
            handleNext();
          }
          break;
        case "f":
        case "F":
          handleFlagToggle();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    currentIndex,
    questions,
    session,
    showResults,
    handleAnswerSelect,
    handleFlagToggle,
    handleNext,
    handlePrevious,
    handleSubmit,
  ]);

  const handleRetake = () => {
    setShowResults(false);
    setResult(null);
    setCurrentIndex(0);
    setSelectedAnswer(undefined);
    setShowExplanation(false);

    // Create new session with shuffled questions
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    const newSession: QuestionSession = {
      questions: shuffledQuestions,
      currentIndex: 0,
      answers: {},
      flaggedQuestions: new Set(),
      startTime: new Date(),
    };

    setSession(newSession);
  };

  const handleContinue = () => {
    const nextGroup = scoringManager.getNextUnlockableGroup(domain, difficulty);
    if (nextGroup) {
      router.push(`/practice/${nextGroup.domain}/${nextGroup.difficulty}`);
    } else {
      router.push("/");
    }
  };

  const handleReview = () => {
    router.push("/review");
  };

  const handleBack = () => {
    router.push(`/practice/${domain}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (showResults && result) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <ResultsSummary
            result={result}
            questions={questions}
            onRetake={handleRetake}
            onContinue={handleContinue}
            onReview={handleReview}
          />
        </div>
      </div>
    );
  }

  if (!session || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            No Questions Available
          </h1>
          <p className="text-muted-foreground mt-2">
            No questions found for this domain and difficulty.
          </p>
          <Button onClick={handleBack} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Domain
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isFlagged = session.flaggedQuestions.has(currentIndex);
  const answeredQuestions = Object.keys(session.answers).length;
  const timeSpent = Date.now() - session.startTime.getTime();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold">
                  {domain.replace("-", " ")} - {difficulty}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Question {currentIndex + 1} of {questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {Math.floor(timeSpent / 60000)}:
                {(Math.floor(timeSpent / 1000) % 60)
                  .toString()
                  .padStart(2, "0")}
              </div>
              <div className="text-sm text-muted-foreground">
                {answeredQuestions}/{questions.length} answered
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Progress Bar */}
        <ProgressBar
          current={currentIndex + 1}
          total={questions.length}
          className="max-w-2xl mx-auto"
        />

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          onFlagToggle={handleFlagToggle}
          isFlagged={isFlagged}
          showExplanation={showExplanation}
        />

        {/* Navigation */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {currentIndex + 1} of {questions.length}
                </span>
              </div>

              {currentIndex === questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={answeredQuestions < questions.length}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit Test
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={currentIndex === questions.length - 1}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Keyboard Shortcuts Help */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground text-center">
              <strong>Keyboard shortcuts:</strong> 1-4 (select answer), ← →
              (navigate), F (flag), Enter (next/submit)
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
