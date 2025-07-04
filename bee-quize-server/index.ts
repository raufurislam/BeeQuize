import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(bodyParser.json()); // To parse JSON bodies
app.use(cors({ origin: ["http://localhost:5173"] }));

// Connect to MongoDB

mongoose.connect(process.env.DB_URl!);

// Quiz Schema (with embedded questions)
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Quiz = mongoose.model("Quiz", quizSchema);

// Create Quiz Route (POST /api/quizzes)
app.post("/api/quizzes", async (req, res) => {
  const { title, description, questions } = req.body;

  if (!title || !questions || questions.length === 0) {
    return res.status(400).send("Title and questions are required.");
  }

  try {
    const quiz = new Quiz({ title, description, questions });
    await quiz.save();
    res.status(201).send(quiz);
  } catch (error) {
    res.status(500).send("Error creating quiz: " + error);
  }
});

// Get All Quizzes Route (GET /api/quizzes)
app.get("/api/quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).send("Error fetching quizzes: " + error);
  }
});

// Get Single Quiz by ID (GET /api/quizzes/:id)
app.get("/api/quizzes/:id", async (req, res) => {
  const quizId = req.params.id;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).send("Error fetching quiz: " + error);
  }
});

// Update Quiz Route (PUT /api/quizzes/:id)
app.patch("/api/quizzes/:id", async (req, res) => {
  const quizId = req.params.id;
  const { title, description, questions } = req.body;

  if (!title || !questions || questions.length === 0) {
    return res.status(400).send("Title and questions are required.");
  }

  try {
    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { title, description, questions, updatedAt: Date.now() },
      { new: true }
    );
    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).send("Error updating quiz: " + error);
  }
});

// Delete Quiz Route (DELETE /api/quizzes/:id)
app.delete("/api/quizzes/:id", async (req, res) => {
  const quizId = req.params.id;

  try {
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }
    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).send("Error deleting quiz: " + error);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
