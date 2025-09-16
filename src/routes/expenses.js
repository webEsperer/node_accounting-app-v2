const express = require('express');

const {
  getExpenses,
  createExpenses,
  getExpensesById,
  deleteExpenses,
  updateExpenses,
} = require('../controllers/expensesController.js');

const router = express.Router();

router.get('/', getExpenses);

router.post('/', express.json(), createExpenses);

router.get('/:id', getExpensesById);

router.delete('/:id', deleteExpenses);

router.patch('/:id', express.json(), updateExpenses);

module.exports = router;
