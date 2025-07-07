import Question from "./home/Question";
import { useAppSelector } from "@/redux/hook";
import QuizSummary from "./home/QuizSummary";
import AllQuiz from "./home/AllQuiz";
import AddQuiz from "./home/AddQuiz";

const App = () => {
  const { quizComplete } = useAppSelector((state) => state.quiz);
  return (
    <div>
      <h1 className="text-center text-9xl my-12">Quiz App</h1>
      <AddQuiz></AddQuiz>
      <AllQuiz />
      {quizComplete ? <QuizSummary /> : <Question />}
    </div>
  );
};

export default App;
