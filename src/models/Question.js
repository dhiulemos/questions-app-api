const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  description: String,
  quiz_id: String,
});

module.exports = mongoose.model('Question', QuestionSchema);
