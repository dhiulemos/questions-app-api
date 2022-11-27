var db = require('../dbconnection'); //reference of dbconnection.js

var Users = {
  // buscar user pelo username
  findOne: function (username) {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, username, password FROM users WHERE username=?', username, (error, results) => {
        if (error) reject(new Error(error));
        console.log(results[0]);
        resolve(results[0]);
      });
    });
  },

  // buscar user pelo id
  findById: function (id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, username FROM users WHERE id=?', id, (error, results) => {
        if (error) reject(new Error(error));
        resolve(results[0]);
      });
    });
  },

  // criar usuario
  create: function (user, callback) {
    return db.query('INSERT INTO users (username, password) VALUE (?, ?)', [user.username, user.password], callback);
  },
};

module.exports = Users;
