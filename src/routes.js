const express = require('express');

const UserController = require('./controllers/UserController');
const QuizController = require('./controllers/QuizController');

const routes = express.Router();

routes.post('/signup', UserController.signup);
routes.post('/login', UserController.login);
routes.put('/update-recent-quizzes', UserController.updateRecentQuizzes);

routes.get('/quizzes', QuizController.getAll);
routes.get('/quizzes/:id', QuizController.getById);
routes.post('/quizzes', QuizController.create);
routes.put('/quizzes/:id', QuizController.update);
routes.delete('/quizzes/:id', QuizController.delete);

module.exports = routes;
