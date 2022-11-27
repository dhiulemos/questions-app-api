const express = require('express');

const AnswersController = require('./controllers/AnswersController');
const QuestionsController = require('./controllers/QuestionsController');
const UsersController = require('./controllers/UsersController');

const routes = express.Router();
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(404).json({ massage: 'Acesso negado' });
  }

  try {
    const secret = process.env.SECRET_KEY;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    console.log(err);
    return res.status(404).json({ massage: 'Token inválido' });
  }
};

routes.post('/questions', QuestionsController.create);
routes.get('/questions', QuestionsController.findAll);
routes.delete('/questions/:id', QuestionsController.delete);
routes.put('/questions/:id', QuestionsController.update);

routes.post('/answers/:question_id', AnswersController.create);
routes.get('/answers/:question_id', AnswersController.findAll);
routes.delete('/answers/:id', AnswersController.delete);
routes.put('/answers/:id', AnswersController.update);

routes.post('/register', UsersController.register);
routes.post('/login', UsersController.login);

routes.get('/user', UsersController.findOne);
routes.get('/user/:id', checkToken, UsersController.findById);

module.exports = routes;
