/* imports */
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

// Open Route
app.get("/", (req, res) => {
  res.status(200).json({ massage: "Bem vindo a nossa API" });
});

app.listen(3000, () => {
  console.log("Server is running 3000.");
});
