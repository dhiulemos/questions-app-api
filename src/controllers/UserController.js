// index, show, store, update, destroy

const User = require('../models/User');

module.exports = {
  async signup(req, res) {
    const { name, email, password, passwordConfirm } = req.body;

    if (!name) return res.json({ message: 'Nome é obrigatório!' });
    if (!email) return res.json({ message: 'Email é obrigatório!' });
    if (!password) return res.json({ message: 'Senha é obrigatória!' });
    if (!passwordConfirm) return res.json({ message: 'Confirmação de senha é obrigatória!' });
    if (password != passwordConfirm) return res.json({ message: 'As senhas não são iguais' });

    let userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({ message: 'E-mail já registrado!' });
    }

    if (!name | !email | !password | !passwordConfirm) {
      return res.json({ message: 'Preencha todos os campos' });
    }

    try {
      const user = await User.create({
        name,
        email,
        password,
      });

      return res.status(200).json({
        message: 'Usuário criado com sucesso',
        user,
      });
    } catch (error) {
      res.json({
        message: 'Server Error',
        error: error.message,
      });
    }
  },

  async signin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        message: 'Preencha todos os campos',
      });
    }

    try {
      const user = await User.findOne({ email, password });

      if (!user) {
        return res.json({
          message: 'E-mail e/ou senha incorreto',
          error: 'E-mail e/ou senha incorreto',
        });
      } else {
        return res.status(200).json({
          message: 'Usuário logado com sucesso',
          user,
        });
      }
    } catch (error) {
      return res.json({
        message: 'Server Error',
        error: error.message,
      });
    }
  },
};
