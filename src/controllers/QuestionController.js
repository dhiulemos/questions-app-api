// index, show, store, update, destroy

const Question = require('../models/Question');

module.exports = {
  async create(req, res) {
    const { quiz_id, description } = req.body;

    if (!quiz_id) return res.json({ message: 'ID do quiz não fornecido!' });
    if (!description) return res.json({ message: 'A descrição da pergunta é obrigatória!' });

    try {
      const question = await Question.create({
        description,
        quiz_id,
      });

      return res.status(200).json({
        message: 'Pergunta criada com sucesso!',
        question,
      });
    } catch (error) {
      res.json({
        message: 'Server Error',
        error: error.message,
      });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { description } = req.body;

    const questionExists = await Quiz.findById({ _id: id });

    if (!questionExists) {
      return res.status(200).json({ message: 'Pergunta não encontrado!' });
    }

    const quiz_id = questionExists.quiz_id;

    try {
      const question = await Question.findOneAndUpdate(
        { _id: id },
        {
          description,
          quiz_id,
        }
      );

      return res.status(200).json({
        message: 'Quiz atualizado com sucesso!',
        question,
      });
    } catch (error) {
      res.json({
        message: 'Server Error',
        error: error.message,
      });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    const questionExists = await Question.findById({ _id: id });

    if (!questionExists) {
      return res.status(200).json({ message: 'Questão não encontrada!' });
    }

    try {
      const question = await Question.deleteOne({ _id: id });

      return res.status(200).json({
        message: 'Questão deletada com sucesso!',
      });
    } catch (error) {
      res.json({
        message: 'Server Error',
        error: error.message,
      });
    }
  },

  async show(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json({ message: 'ID da questão não fornecido!' });
    }

    try {
      const question = await Question.findOne({ _id: id });

      return res.status(200).json({
        message: 'Questão encontrada com sucesso!',
        question,
      });
    } catch (error) {
      res.json({
        message: 'Server Error',
        error: error.message,
      });
    }
  },

  async showByQuiz(req, res) {
    const { quiz_id } = req.params;

    if (!quiz_id) {
      return res.status(200).json({ message: 'ID do usuário não fornecido!' });
    }

    try {
      const questions = await Question.find({ quiz_id: quiz_id });

      if (!questions) {
        return res.status(200).json({ message: 'Não encontramos nenhuma questão cadastrado neste quiz!' });
      }

      return res.status(200).json({
        message: 'Questões encontradas com sucesso!',
        questions,
      });
    } catch (error) {
      res.json({
        message: 'Server Error',
        error: error.message,
      });
    }
  },
};
