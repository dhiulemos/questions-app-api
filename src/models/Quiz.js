const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  name: String,
  user_id: String,
});

module.exports = mongoose.model('Quiz', QuizSchema);
