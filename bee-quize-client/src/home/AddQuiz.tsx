import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddQuizMutation } from "@/redux/api/quizApi";
import { useState } from "react";
import { toast } from "sonner";

type QuizData = {
  title: string;
  description: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
};

export default function AddQuiz() {
  const [addQuiz, { isLoading, isError, isSuccess }] = useAddQuizMutation();
  const [step, setStep] = useState(1);
  const [addQuestionStep, setAddQuestionStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({
    title: "",
    description: "",
    questions: [],
  });
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    optionIndex?: number
  ) => {
    const { value } = e.target;
    if (field === "title" || field === "description") {
      setQuizData((prev) => ({ ...prev, [field]: value }));
    } else if (field === "question") {
      setNewQuestion((prev) => ({ ...prev, question: value }));
    } else if (field === "option" && optionIndex !== undefined) {
      const updatedOptions = [...newQuestion.options];
      updatedOptions[optionIndex] = value;
      setNewQuestion((prev) => ({ ...prev, options: updatedOptions }));
    }
  };

  const handleCorrectAnswerSelect = (answer: string) => {
    setNewQuestion((prev) => ({ ...prev, correctAnswer: answer }));
  };

  const addQuestion = () => {
    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
    setOpenAddQuestionModal(false);
    setAddQuestionStep(1);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    const res = await addQuiz(quizData);
    console.log(res);
    toast("Quiz added successfully");
  };

  return (
    <div className="my-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Add Quiz</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Quiz</DialogTitle>
            <DialogDescription>
              {step === 1 && "Step 1: Enter Quiz Details"}
              {step === 2 && "Step 2: Add Questions"}
              {step === 3 && "Step 3: Submit"}
            </DialogDescription>
          </DialogHeader>

          {step === 1 && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={quizData.title}
                  onChange={(e) => handleInputChange(e, "title")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={quizData.description}
                  onChange={(e) => handleInputChange(e, "description")}
                  className="col-span-3"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4 py-4">
              {quizData.questions.map((q, index) => (
                <div key={index} className="border p-4 rounded-lg relative">
                  <Label className="text-right">
                    Q{index + 1}: {q.question}
                  </Label>
                  <Button
                    onClick={() => removeQuestion(index)}
                    variant="outline"
                    className="absolute top-2 right-2"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => setOpenAddQuestionModal(true)}
                className="mt-4 w-full"
              >
                Add Another Question
              </Button>
            </div>
          )}

          <DialogFooter>
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            {step < 3 && <Button onClick={nextStep}>Next</Button>}
            {step === 3 && (
              <Button onClick={handleSubmit} className="bg-green-500">
                Submit Quiz
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openAddQuestionModal}
        onOpenChange={setOpenAddQuestionModal}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
            <DialogDescription>
              Step {addQuestionStep}:{" "}
              {addQuestionStep === 1 ? "Question" : "Options"}
            </DialogDescription>
          </DialogHeader>

          {addQuestionStep === 1 && (
            <Input
              placeholder="Enter question"
              value={newQuestion.question}
              onChange={(e) => handleInputChange(e, "question")}
            />
          )}
          {addQuestionStep === 2 &&
            newQuestion.options.map((option, i) => (
              <Input
                key={i}
                placeholder={`Option ${i + 1}`}
                value={option}
                onChange={(e) => handleInputChange(e, "option", i)}
              />
            ))}
          {addQuestionStep === 3 && (
            <div>
              <Label>Correct Answer</Label>
              <select
                value={newQuestion.correctAnswer}
                onChange={(e) => handleCorrectAnswerSelect(e.target.value)}
                className="w-full p-2 mt-2 border rounded-md"
              >
                {newQuestion.options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          <DialogFooter>
            {addQuestionStep > 1 && (
              <Button onClick={() => setAddQuestionStep((s) => s - 1)}>
                Back
              </Button>
            )}
            {addQuestionStep < 3 ? (
              <Button onClick={() => setAddQuestionStep((s) => s + 1)}>
                Next
              </Button>
            ) : (
              <Button onClick={addQuestion}>Add Question</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
