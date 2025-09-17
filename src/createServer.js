'use strict';

const { users } = require('./controllers/usersController.js');
const { expenses } = require('./controllers/expensesController.js');

const express = require('express');
const usersRouter = require('./routes/users.js');
const expensesRouter = require('./routes/expenses.js');

function createServer() {
  const app = express();

  users.length = 0;
  expenses.length = 0;
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
