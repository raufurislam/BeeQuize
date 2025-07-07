import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["quiz","user","admin"],
  endpoints: (builder) => ({

    addQuiz: builder.mutation({
      query: (body) => ({
        url: "/quizzes",
        method: "POST",
        body,
      }),
      invalidatesTags:["quiz"]
    }),

    getAllQuiz:builder.query({
        query:()=>"/quizzes",
        providesTags:["quiz"]
    })
  }),
});

export const {useAddQuizMutation,useGetAllQuizQuery}=quizApi