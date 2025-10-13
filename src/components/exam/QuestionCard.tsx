"use client";

import { Question } from "@/lib/data/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flag, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer?: number;
  onAnswerSelect: (answerIndex: number) => void;
  onFlagToggle: () => void;
  isFlagged: boolean;
  showExplanation?: boolean;
  className?: string;
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onFlagToggle,
  isFlagged,
  showExplanation = false,
  className,
}: QuestionCardProps) {
  return (
    <Card className={cn("w-full max-w-4xl mx-auto", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              Question {currentIndex + 1} of {totalQuestions}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {question.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {question.domain.replace("-", " ")}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onFlagToggle}
            className={cn(
              "h-8 w-8 p-0",
              isFlagged && "text-yellow-600 hover:text-yellow-700"
            )}
          >
            {isFlagged ? (
              <Bookmark className="h-4 w-4 fill-current" />
            ) : (
              <Flag className="h-4 w-4" />
            )}
          </Button>
        </div>
        <CardTitle className="text-lg leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={cn(
                "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:border-primary/50",
                selectedAnswer === index
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50",
                showExplanation && index === question.correctAnswer
                  ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                  : "",
                showExplanation &&
                  selectedAnswer === index &&
                  index !== question.correctAnswer
                  ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                  : ""
              )}
              onClick={() => onAnswerSelect(index)}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full border-2 text-sm font-medium",
                    selectedAnswer === index
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30 text-muted-foreground",
                    showExplanation && index === question.correctAnswer
                      ? "border-green-500 bg-green-500 text-white"
                      : "",
                    showExplanation &&
                      selectedAnswer === index &&
                      index !== question.correctAnswer
                      ? "border-red-500 bg-red-500 text-white"
                      : ""
                  )}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1 text-sm leading-relaxed">{option}</span>
                {showExplanation && index === question.correctAnswer && (
                  <Badge
                    variant="default"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Correct
                  </Badge>
                )}
                {showExplanation &&
                  selectedAnswer === index &&
                  index !== question.correctAnswer && (
                    <Badge variant="destructive">Your Answer</Badge>
                  )}
              </div>
            </div>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
            <h4 className="font-semibold text-sm mb-2 text-muted-foreground">
              Explanation
            </h4>
            <p className="text-sm leading-relaxed">{question.explanation}</p>
            {question.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
