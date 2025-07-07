import { quizData } from "@/home/quizData";
import { createSlice } from "@reduxjs/toolkit";

interface QuizState {
  questions: typeof quizData;
  currentQuestionIndex: number;
  userAnswers: (string | null)[];
  quizComplete: boolean;
}

const initialState: QuizState = {
  questions: quizData,
  currentQuestionIndex: 0,
  userAnswers: Array(quizData.length).fill(null),
  quizComplete: false,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state.userAnswers[questionIndex] = answer;
    },
    // nextQuestion: (state) => {
    //   if (state.currentQuestionIndex < state.questions.length - 1) {
    //     state.currentQuestionIndex += 1;
    //   }
    // },

    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      } else {
        state.quizComplete = true;
      }
    },
    previousQuestion: (state) => {
      state.currentQuestionIndex -= 1;
    },
    setQuiz: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const { setAnswer, nextQuestion, previousQuestion, setQuiz } =
  quizSlice.actions;

export default quizSlice.reducer;
