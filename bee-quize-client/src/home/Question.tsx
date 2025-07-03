import { useAppSelector } from "../redux/hook";

const Question = () => {
  const { value } = useAppSelector((state) => state.quiz);

  console.log(value);

  return (
    <div>
      <h2>Question Title</h2>
      <p>Question description goes here.</p>
    </div>
  );
};

export default Question;
