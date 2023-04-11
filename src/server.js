// Configs
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const routes = require('./routes');

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(routes);

// Open Route
app.get('/', (req, res) => {
  res.status(200).json({ massage: 'Bem vindo a nossa API' });
});

// Conexão com o MongoDB
const DB_USER = 'questionsapp';
const DB_PASSWORD = encodeURIComponent('vVZx0CkwP374UgfK');

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@questions-app.jpcjsqe.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(3333);
    console.log('MongoDB is running!');
  })
  .catch((err) => console.log(err));
