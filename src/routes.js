const express = require('express');

const UserController = require('./controllers/UserController');
const QuizController = require('./controllers/QuizController');
const QuestionController = require('./controllers/QuestionController');

const routes = express.Router();

routes.post('/signup', UserController.signup);
routes.post('/signin', UserController.signin);

routes.post('/quiz', QuizController.create);
routes.get('/quiz/all/:user_id', QuizController.showByUser);
routes.get('/quiz/:id', QuizController.show);
routes.patch('/quiz/:id', QuizController.update);
routes.delete('/quiz/:id', QuizController.delete);

routes.post('/question', QuestionController.create);
routes.get('/question/all/:quiz_id', QuestionController.showByQuiz);
routes.get('/question/:id', QuestionController.show);
routes.patch('/question/:id', QuestionController.update);
routes.delete('/question/:id', QuestionController.delete);

module.exports = routes;
