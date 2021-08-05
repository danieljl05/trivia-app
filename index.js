"use strict";

// Enviroment & main dependencies load
require("dotenv").config();
const logger = require("morgan");
const express = require("express");

const userRoutes = require("./routes/user.routes");

// Server config
const port = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/users", userRoutes);

app.use((req, res, next) => {
  res.status(404).send("Sorry cant find that!");
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Server init
app.listen(port, () => {
  console.log(`Assistant webhook listening on port ${port}!`);
  console.log(`http://localhost:${port}/`);
});
