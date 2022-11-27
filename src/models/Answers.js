var db = require('../dbconnection'); //reference of dbconnection.js

var Answers = {
  // buscar respostas para uma pergunta
  findAll: function (question_id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM answers WHERE question_id = ?', question_id, (error, results) => {
        if (error) reject(new Error(error));
        resolve(results);
      });
    });
  },

  // buscar uma resposta pelo id
  findById: function (id) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT id, answer, correct_answer, question_id FROM answers WHERE id= ?',
        id,
        (error, results) => {
          if (error) reject(new Error(error));
          resolve(results[0]);
        }
      );
    });
  },

  // criar resposta
  create: function (answer, question_id, callback) {
    return db.query(
      'INSERT INTO answers (answer, correct_answer, question_id) VALUES(?,?,?)',
      [answer.answer, answer.correct_answer, question_id],
      callback
    );
  },

  // excluir resposta
  delete: function (id, callback) {
    return db.query(`DELETE FROM answers WHERE id= ?`, id, callback);
  },

  // atualizar resposta
  update: function (answer, id, callback) {
    return db.query(
      'UPDATE answers SET answer=?, correct_answer= ? WHERE id=?',
      [answer.answer, answer.correct_answer, id],
      callback
    );
  },
};

module.exports = Answers;
