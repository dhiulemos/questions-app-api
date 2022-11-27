var db = require('../dbconnection'); //reference of dbconnection.js

var Questions = {
  // buscar perguntas
  findAll: function () {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM questions ORDER BY id', (error, results) => {
        if (error) reject(new Error(error));
        resolve(results);
      });
    });
  },

  // buscar pergunta pelo id
  findById: function (id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, question FROM questions WHERE id=?', id, (error, results) => {
        if (error) reject(new Error(error));

        resolve(results);
      });
    });
  },

  // criar pergunta
  create: function (question, callback) {
    return db.query('INSERT INTO questions (question) VALUE (?)', question, callback);
  },

  // excluir pergunta
  delete: function (id, callback) {
    return db.query(`DELETE FROM questions WHERE id= ?`, id, callback);
  },

  // atualizar pergunta
  update: function (obj, callback) {
    return db.query('UPDATE questions SET question=? WHERE id=?', [obj.question, obj.id], callback);
  },
};

module.exports = Questions;
