const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctOption: Number,
});

const QuizSchema = new mongoose.Schema({
  title: String,
  category: String,
  questions: [QuestionSchema],
});

module.exports = mongoose.model('Quiz', QuizSchema);
