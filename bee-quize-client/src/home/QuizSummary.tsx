// Overall summary
// Progress Bar
// Statistics
// You did it! (comments)

/*
 * Correct answers count
 * Incorrect answers count
 *  Correct Percentage
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/redux/hook";

const getPerformance = (percentage: number) => {
  if (percentage >= 90) return { rating: "Excellent", color: "bg-green-800" };
  if (percentage >= 50) return { rating: "Good", color: "bg-yellow-500" };
  if (percentage >= 30)
    return { rating: "Needs Improvement", color: "bg-orange-500" };
  return { rating: "Poor", color: "bg-red-500" };
};

const QuizSummary = () => {
  const { questions, userAnswers } = useAppSelector((state) => state.quiz);
  console.log(questions, userAnswers);

  // Calculate correct and incorrect answers
  const correctAnswersCount = questions.reduce((count, question, index) => {
    return question.correctAnswer === userAnswers[index] ? count + 1 : count;
  }, 0);

  const incorrectAnswersCount = questions.length - correctAnswersCount;

  const correctPercentage = parseFloat(
    ((correctAnswersCount / questions.length) * 100).toFixed(2)
  );

  const { rating, color } = getPerformance(correctPercentage);

  console.log(correctAnswersCount, incorrectAnswersCount, correctPercentage);

  return (
    <div>
      <Card className="max-w-lg mx-auto p-6 rounded-xl shadow-xl">
        <CardHeader className="text-2xl font-bold">
          <CardTitle>Quize Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-medium mb-4">
            You got {correctAnswersCount} out of {questions.length}
          </h3>

          {/* progress bar */}
          <div className="mb-4">
            <Progress
              value={correctPercentage}
              indicatorColor={color}
              className="h-4"
            />
          </div>

          <div className="flex justify-between mt-2">
            <span className="text-sm">{correctPercentage}%</span>
            <span className="text-sm">Performance: {rating}</span>
          </div>
          <div className="mb-2">
            <p className="text-sm">
              <strong>Incorrect Answers:</strong> {incorrectAnswersCount}
            </p>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm">Great Job Keep Practising</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizSummary;
