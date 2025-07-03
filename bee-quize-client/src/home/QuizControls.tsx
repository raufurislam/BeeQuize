import { Button } from "@/components/ui/button";

const QuizControls = () => {
  const handleNext = () => {};

  return (
    <div className="flex justify-between mt-4 gap-3">
      <Button className="w-1/2">Previous</Button>
      <Button onClick={handleNext} className="w-1/2">
        Next
      </Button>
    </div>
  );
};

export default QuizControls;
