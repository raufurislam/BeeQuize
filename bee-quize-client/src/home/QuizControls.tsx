import { Button } from "@/components/ui/button";
import { nextQuestion, previousQuestion } from "@/redux/features/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const QuizControls = () => {
  const dispatch = useAppDispatch();
  const { currentQuestionIndex, userAnswers } = useAppSelector(
    (state) => state.quiz
  );
  const isAnswerSelected = userAnswers[currentQuestionIndex] !== null;

  const handleNext = () => {
    if (isAnswerSelected) {
      dispatch(nextQuestion());
    }
  };

  const handlePrev = () => {
    dispatch(previousQuestion());
  };

  return (
    <div className="flex justify-between mt-4 gap-3">
      <Button onClick={handlePrev} className="w-1/2">
        Previous
      </Button>
      <Button onClick={handleNext} className="w-1/2">
        Next
      </Button>
    </div>
  );
};

export default QuizControls;
