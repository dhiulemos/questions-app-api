const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  // Buscar usuário pelo nome
  async findOne(req, res) {
    const { username } = req.body;

    if (!username) {
      res.json({ massage: 'O nome é obrigatório!' });
    }

    const user = await Users.findOne(username);

    if (!user) {
      return res.status(404).json({ massage: 'Usuário não encontrado' });
    }

    return res.status(200).json({ user });
  },

  // Buscar usuário pelo id
  async findById(req, res) {
    const id = req.params.id;

    const user = await Users.findById(id);

    if (!user) return res.status(404).json({ massage: 'Usuário não encontrado' });

    return res.status(200).json({ user });
  },

  // Registrar usuário
  async register(req, res) {
    const { username, password } = req.body;

    if (!username) return res.status(404).json({ massage: 'O username é obrigatório' });
    if (!password) return res.status(404).json({ massage: 'A senha é obrigatória' });

    const userExists = await Users.findOne(username);

    if (userExists) return res.status(404).json({ massage: 'Nome de usuário já está em uso' });

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = {
      username: username,
      password: passwordHash,
    };

    Users.create(user, (err, rs) => {
      if (err) {
        return res.status(500).json({
          massage: 'Encontramos um erro em nosso servidor. Por favor tente novamente.',
        });
      } else {
        return res.status(200).json({ massage: 'Usuário registrado com sucesso!' });
      }
    });
  },

  // Login usuário
  async login(req, res) {
    const { username, password } = req.body;

    if (!username) {
      return res.status(404).json({ massage: 'O username é obrigatório' });
    }

    if (!password) {
      return res.status(404).json({ massage: 'A senha é obrigatória' });
    }

    const user = await Users.findOne(username);

    if (!user) return res.status(404).json({ massage: 'Usuário não encontrado' });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(404).json({ massage: 'Senha inválida!' });
    }

    try {
      const secret = process.env.SECRET_KEY;
      const token = jwt.sign({ id: user.id }, secret);

      return res.status(200).json({ massage: 'Autenticação realizada com sucesso', token });
    } catch (err) {
      return res.status(500).json({ message: 'Aconteceu um erro no servidor!' });
    }
  },
};
