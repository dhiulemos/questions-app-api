const Quiz = require('../models/Quiz');

module.exports = {
  async getAll(req, res) {
    try {
      const quizzes = await Quiz.find();
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz não encontrado' });
      }
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const quiz = new Quiz(req.body);
      const savedQuiz = await quiz.save();
      res.json(savedQuiz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedQuiz) {
        return res.status(404).json({ message: 'Quiz não encontrado para atualização' });
      }
      res.json(updatedQuiz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
      if (!deletedQuiz) {
        return res.status(404).json({ message: 'Quiz não encontrado para exclusão' });
      }
      res.json(deletedQuiz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
