import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Button } from "@/components/ui/button";
import QuizControls from "./QuizControls";
import { setAnswer } from "@/redux/features/quizSlice";

const Question = () => {
  const dispatch = useAppDispatch();
  const { questions, currentQuestionIndex, userAnswers } = useAppSelector(
    (state) => state.quiz
  );

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];

  const handleAnswerChange = (ans: string) => {
    dispatch(
      setAnswer({
        questionIndex: currentQuestionIndex,
        answer: ans,
      })
    );
    console.log(ans);
  };

  console.log(userAnswers);

  return (
    <div className="flex justify-center">
      <Card className="w-[450px] mt-10">
        <CardHeader>
          <CardTitle>{currentQuestion.question}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <div>
            {currentQuestion.options.map((option, index) => (
              <Button
                variant={option === currentAnswer ? "default" : "outline"}
                onClick={() => handleAnswerChange(option)}
                className="w-full mt-3"
                size="lg"
                key={index}
              >
                {option}
              </Button>
            ))}
          </div>

          <QuizControls></QuizControls>
        </CardContent>
      </Card>
    </div>
  );
};

export default Question;
