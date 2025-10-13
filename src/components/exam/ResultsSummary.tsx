"use client";

import { ExamResult, Question } from "@/lib/data/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Trophy,
  RotateCcw,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { scoringManager } from "@/lib/utils/scoring";

interface ResultsSummaryProps {
  result: ExamResult;
  questions: Question[];
  onRetake: () => void;
  onContinue: () => void;
  onReview: () => void;
  className?: string;
}

export function ResultsSummary({
  result,
  questions,
  onRetake,
  onContinue,
  onReview,
  className,
}: ResultsSummaryProps) {
  const passed = result.passed;
  const score = result.score;
  const timeSpent = scoringManager.formatTime(result.timeSpent);

  // Calculate question breakdown
  const correctQuestions = questions.filter(
    (q, index) => result.answers[index] === q.correctAnswer
  );
  const incorrectQuestions = questions.filter(
    (q, index) => result.answers[index] !== q.correctAnswer
  );
  const flaggedCount = result.flaggedQuestions.length;

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-6", className)}>
      {/* Main Results Card */}
      <Card
        className={cn(
          "border-2 transition-all duration-300",
          passed
            ? "border-green-500 bg-green-50 dark:bg-green-950/20"
            : "border-red-500 bg-red-50 dark:bg-red-950/20"
        )}
      >
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            {passed ? (
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white">
                <Trophy className="w-8 h-8" />
              </div>
            ) : (
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500 text-white">
                <Target className="w-8 h-8" />
              </div>
            )}
          </div>
          <CardTitle
            className={cn(
              "text-2xl font-bold",
              passed
                ? "text-green-700 dark:text-green-400"
                : "text-red-700 dark:text-red-400"
            )}
          >
            {passed ? "Congratulations!" : "Keep Practicing!"}
          </CardTitle>
          <p className="text-muted-foreground">
            {passed
              ? "You passed this section with flying colors!"
              : "You need 80% to pass. Review the questions and try again."}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="text-center">
            <div
              className={cn(
                "text-4xl font-bold mb-2",
                scoringManager.getScoreColor(score)
              )}
            >
              {scoringManager.formatScore(score)}
            </div>
            <div className="text-sm text-muted-foreground">
              {result.correctAnswers} out of {result.totalQuestions} questions
              correct
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Your Score</span>
              <span>{scoringManager.formatScore(score)}</span>
            </div>
            <Progress value={score} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span className="font-medium">80% (Passing Score)</span>
              <span>100%</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">
                {result.correctAnswers}
              </div>
              <div className="text-xs text-muted-foreground">Correct</div>
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <XCircle className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-red-600">
                {incorrectQuestions.length}
              </div>
              <div className="text-xs text-muted-foreground">Incorrect</div>
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {timeSpent}
              </div>
              <div className="text-xs text-muted-foreground">Time Spent</div>
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {flaggedCount}
              </div>
              <div className="text-xs text-muted-foreground">Flagged</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={onReview} variant="outline" className="flex-1">
              <BookOpen className="w-4 h-4 mr-2" />
              Review Questions
            </Button>

            <Button onClick={onRetake} variant="outline" className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Test
            </Button>

            {passed && (
              <Button onClick={onContinue} className="flex-1">
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Question Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Correct Questions */}
          {correctQuestions.length > 0 && (
            <div>
              <h4 className="font-medium text-green-600 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Correct Answers ({correctQuestions.length})
              </h4>
              <div className="space-y-2">
                {correctQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                  >
                    <div className="text-sm font-medium">
                      {question.question}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Your answer:{" "}
                      {
                        question.options[
                          result.answers[questions.indexOf(question)]
                        ]
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Incorrect Questions */}
          {incorrectQuestions.length > 0 && (
            <div>
              <h4 className="font-medium text-red-600 mb-2 flex items-center">
                <XCircle className="w-4 h-4 mr-2" />
                Incorrect Answers ({incorrectQuestions.length})
              </h4>
              <div className="space-y-2">
                {incorrectQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                  >
                    <div className="text-sm font-medium">
                      {question.question}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Your answer:{" "}
                      {
                        question.options[
                          result.answers[questions.indexOf(question)]
                        ]
                      }
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      Correct answer: {question.options[question.correctAnswer]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
