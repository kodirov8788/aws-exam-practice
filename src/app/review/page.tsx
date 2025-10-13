"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/exam/QuestionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Flag,
  XCircle,
  BookOpen,
  Filter,
  Search,
} from "lucide-react";
import { Question, Domain, Difficulty } from "@/lib/data/types";
import { storageManager } from "@/lib/storage/localStorage";
import { getQuestionById, questions } from "@/lib/data/questions";

export default function ReviewPage() {
  const router = useRouter();
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [incorrectQuestions, setIncorrectQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("flagged");
  const [filterDomain, setFilterDomain] = useState<Domain | "all">("all");
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | "all">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadReviewData();
  }, []);

  const loadReviewData = () => {
    // Load flagged questions
    const flagged = storageManager.loadFlaggedQuestions();
    setFlaggedQuestions(flagged);

    // Load incorrect questions from exam results
    const examResults = storageManager.loadExamResults();
    const incorrect: Question[] = [];

    examResults.forEach((result) => {
      if (!result.passed) {
        // Find questions that were answered incorrectly
        Object.entries(result.answers).forEach(
          ([questionIndex, userAnswer]) => {
            const questionId = questions[parseInt(questionIndex)]?.id;
            if (questionId) {
              const question = getQuestionById(questionId);
              if (question && question.correctAnswer !== userAnswer) {
                if (!incorrect.find((q) => q.id === questionId)) {
                  incorrect.push(question);
                }
              }
            }
          }
        );
      }
    });

    setIncorrectQuestions(incorrect);
  };

  const handleBack = () => {
    router.push("/");
  };

  const handleFlagToggle = (questionId: string) => {
    if (storageManager.isQuestionFlagged(questionId)) {
      storageManager.removeFlaggedQuestion(questionId);
    } else {
      storageManager.addFlaggedQuestion(questionId);
    }
    loadReviewData();
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    const currentQuestions = getCurrentQuestions();
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const getCurrentQuestions = (): Question[] => {
    let questions: Question[] = [];

    if (selectedTab === "flagged") {
      questions = flaggedQuestions
        .map((id) => getQuestionById(id))
        .filter((q): q is Question => q !== undefined);
    } else if (selectedTab === "incorrect") {
      questions = incorrectQuestions;
    }

    // Apply filters
    if (filterDomain !== "all") {
      questions = questions.filter((q) => q.domain === filterDomain);
    }
    if (filterDifficulty !== "all") {
      questions = questions.filter((q) => q.difficulty === filterDifficulty);
    }
    if (searchTerm) {
      questions = questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    return questions;
  };
  const currentQuestions = getCurrentQuestions();
  const currentQuestion = currentQuestions[currentQuestionIndex];

  // Reset index when switching tabs or filters
  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [selectedTab, filterDomain, filterDifficulty, searchTerm]);

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
                  Review Questions
                </h1>
                <p className="text-muted-foreground mt-1">
                  Review flagged questions and incorrect answers
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {flaggedQuestions.length} flagged
              </Badge>
              <Badge variant="outline" className="text-sm">
                {incorrectQuestions.length} incorrect
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Domain:</label>
                <select
                  value={filterDomain}
                  onChange={(e) =>
                    setFilterDomain(e.target.value as Domain | "all")
                  }
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  <option value="all">All Domains</option>
                  <option value="cloud-concepts">Cloud Concepts</option>
                  <option value="security-compliance">
                    Security & Compliance
                  </option>
                  <option value="technology-services">
                    Technology & Services
                  </option>
                  <option value="billing-pricing">Billing & Pricing</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Difficulty:</label>
                <select
                  value={filterDifficulty}
                  onChange={(e) =>
                    setFilterDifficulty(e.target.value as Difficulty | "all")
                  }
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-1 border rounded-md text-sm w-48"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Tabs */}
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="flagged" className="flex items-center gap-2">
              <Flag className="w-4 h-4" />
              Flagged Questions ({flaggedQuestions.length})
            </TabsTrigger>
            <TabsTrigger value="incorrect" className="flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Incorrect Answers ({incorrectQuestions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flagged" className="space-y-6">
            {currentQuestions.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Flag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Flagged Questions
                  </h3>
                  <p className="text-muted-foreground">
                    You haven&apos;t flagged any questions yet. Flag questions
                    during practice to review them here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {currentQuestions.length} flagged questions
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentQuestionIndex + 1} of {currentQuestions.length}
                  </div>
                </div>

                {currentQuestion && (
                  <QuestionCard
                    question={currentQuestion}
                    currentIndex={currentQuestionIndex}
                    totalQuestions={currentQuestions.length}
                    onAnswerSelect={() => {}} // No answer selection in review mode
                    onFlagToggle={() => handleFlagToggle(currentQuestion.id)}
                    isFlagged={storageManager.isQuestionFlagged(
                      currentQuestion.id
                    )}
                    showExplanation={true}
                  />
                )}

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {currentQuestionIndex + 1} of{" "}
                          {currentQuestions.length}
                        </span>
                      </div>

                      <Button
                        onClick={handleNext}
                        disabled={
                          currentQuestionIndex === currentQuestions.length - 1
                        }
                      >
                        Next
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="incorrect" className="space-y-6">
            {currentQuestions.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Incorrect Answers
                  </h3>
                  <p className="text-muted-foreground">
                    Great job! You haven&apos;t answered any questions
                    incorrectly yet, or you haven&apos;t taken any tests.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {currentQuestions.length} questions you answered
                    incorrectly
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentQuestionIndex + 1} of {currentQuestions.length}
                  </div>
                </div>

                {currentQuestion && (
                  <QuestionCard
                    question={currentQuestion}
                    currentIndex={currentQuestionIndex}
                    totalQuestions={currentQuestions.length}
                    onAnswerSelect={() => {}} // No answer selection in review mode
                    onFlagToggle={() => handleFlagToggle(currentQuestion.id)}
                    isFlagged={storageManager.isQuestionFlagged(
                      currentQuestion.id
                    )}
                    showExplanation={true}
                  />
                )}

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {currentQuestionIndex + 1} of{" "}
                          {currentQuestions.length}
                        </span>
                      </div>

                      <Button
                        onClick={handleNext}
                        disabled={
                          currentQuestionIndex === currentQuestions.length - 1
                        }
                      >
                        Next
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* Study Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Study Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <strong>Flagged Questions:</strong> Review questions you marked
                for later study. Focus on understanding the concepts and
                explanations.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Incorrect Answers:</strong> Pay special attention to
                questions you answered incorrectly. Read the explanations
                carefully and understand why the correct answer is right.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Practice Regularly:</strong> Review these questions
                regularly and retake practice tests to reinforce your learning.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
