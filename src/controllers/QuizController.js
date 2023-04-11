// index, show, store, update, destroy

const Quiz = require('../models/Quiz');

module.exports = {
  async create(req, res) {
    const { name, user_id } = req.body;

    if (!user_id) return res.json({ message: 'ID do usuário não fornecido!' });
    if (!name) return res.json({ message: 'Nome do quiz é obrigatório!' });

    try {
      const quiz = await Quiz.create({
        name,
        user_id,
      });

      return res.status(200).json({
        message: 'Quiz criado com sucesso!',
        quiz,
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
    const { name } = req.body;

    const quizExists = await Quiz.findById({ _id: id });

    if (!quizExists) {
      return res.status(200).json({ message: 'Quiz não encontrado!' });
    }

    const user_id = quizExists.user_id;

    try {
      const quiz = await Quiz.findOneAndUpdate(
        { _id: id },
        {
          name,
          user_id,
        }
      );

      return res.status(200).json({
        message: 'Quiz atualizado com sucesso!',
        quiz,
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

    const quizExists = await Quiz.findById({ _id: id });

    if (!quizExists) {
      return res.status(200).json({ message: 'Quiz não encontrado!' });
    }

    try {
      const quiz = await Quiz.deleteOne({ _id: id });

      return res.status(200).json({
        message: 'Quiz deletado com sucesso!',
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
      return res.status(200).json({ message: 'ID do quiz não fornecido!' });
    }

    try {
      const quiz = await Quiz.findOne({ _id: id });

      return res.status(200).json({
        message: 'Quiz encontrado com sucesso!',
        quiz,
      });
    } catch (error) {
      res.json({
        message: 'Server Error',
        error: error.message,
      });
    }
  },

  async showByUser(req, res) {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(200).json({ message: 'ID do usuário não fornecido!' });
    }

    try {
      const quizzes = await Quiz.find({ user_id: user_id });

      if (!quizzes) {
        return res.status(200).json({ message: 'Não encontramos nenhum quiz cadastrado pelo seu usuário!' });
      }

      return res.status(200).json({
        message: 'Quizzes encontrado com sucesso!',
        quizzes,
      });
    } catch (error) {
      res.json({
        message: 'Server Error',
        error: error.message,
      });
    }
  },
};
