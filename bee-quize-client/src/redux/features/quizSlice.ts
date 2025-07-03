import { quizData } from "@/home/quizData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: quizData,
  currentQuestionIndex: 0,
  userAnswers: Array(quizData.length).fill(null),
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state.userAnswers[questionIndex] = answer;
    },
  },
});

export const { setAnswer } = quizSlice.actions;

export default quizSlice.reducer;
