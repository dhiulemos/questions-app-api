// UserController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async signup(req, res) {
    const { name, email, password, photo_url } = req.body;

    try {
      // Verifique se o email já está cadastrado
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já registrado.' });
      }

      // Hash da senha antes de salvar no banco de dados
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        photo_url,
      });

      return res.status(201).json({
        message: 'Usuário cadastrado com sucesso',
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Erro no servidor',
        error: error.message,
      });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          message: 'Credenciais inválidas',
        });
      }

      // Comparar senha informada com a senha no banco de dados
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({
          message: 'Credenciais inválidas',
        });
      }

      // Criar token JWT
      const token = jwt.sign({ userId: user._id }, 'seuSegredoDoJWT', { expiresIn: '1h' });

      return res.status(200).json({
        message: 'Login bem-sucedido',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          photo_url: user.photo_url,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Erro no servidor',
        error: error.message,
      });
    }
  },

  async updateRecentQuizzes(userId, quizId, accuracyRate) {
    try {
      // Obter o usuário
      const user = await User.findById(userId);

      // Adicionar o novo quiz aos últimos quizzes realizados
      user.recent_quizzes.unshift({ quizId, accuracy_rate: accuracyRate });

      // Limitar a quantidade de quizzes recentes a 3
      if (user.recent_quizzes.length > 3) {
        user.recent_quizzes.pop(); // Remover o quiz mais antigo
      }

      // Salvar as alterações
      await user.save();

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
