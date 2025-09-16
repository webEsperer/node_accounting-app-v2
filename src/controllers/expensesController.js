const { expenses } = require('../data/expenses.js');
const { users } = require('../data/users.js');

beforeEach(() => {
  expenses.length = 0;
});

function getExpenses(req, res) {
  const { userId, categories, from, to } = req.query;
  let filteredExpenses = [...expenses];

  if (userId) {
    const id = Number(userId);

    if (isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    filteredExpenses = filteredExpenses.filter(
      (e) => e.userId === Number(userId),
    );
  }

  if (categories) {
    const categoriesArr = categories.split(',').map((c) => c.trim());

    filteredExpenses = filteredExpenses.filter(
      (e) => categoriesArr.includes(e.category),
      // eslint-disable-next-line function-paren-newline
    );
  }

  if (from) {
    const fromDate = new Date(from);

    if (isNaN(fromDate)) {
      res.sendStatus(400);

      return;
    }

    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.spentAt) >= fromDate,
    );
  }

  if (to) {
    const toDate = new Date(to);

    if (isNaN(toDate)) {
      res.sendStatus(400);

      return;
    }

    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.spentAt) <= toDate,
    );
  }

  res.send(filteredExpenses);
}

function createExpenses(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    !spentAt ||
    !title ||
    amount === undefined ||
    !category
  ) {
    res.sendStatus(400);

    return;
  }

  const userExists = users.some((e) => e.id === Number(userId));

  if (!userExists) {
    res.sendStatus(400);

    return;
  }

  if (isNaN(Number(userId)) || isNaN(Number(amount))) {
    res.sendStatus(400);

    return;
  }

  const date = new Date(spentAt);

  if (isNaN(date)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: expenses.length + 1,
    userId: Number(userId),
    spentAt: date.toISOString(),
    title,
    amount: Number(amount),
    category,
    note: note || '',
  };

  expenses.push(newExpense);

  res.status(201).send(newExpense);
}

function getExpensesById(req, res) {
  const { id } = req.params;

  const expense = expenses.find((e) => e.id === Number(id));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
}

function deleteExpenses(req, res) {
  const { id } = req.params;

  const expenseIndex = expenses.findIndex((e) => e.id === Number(id));

  if (expenseIndex === -1) {
    res.sendStatus(404);

    return;
  }

  expenses.splice(expenseIndex, 1);
  res.sendStatus(204);
}

function updateExpenses(req, res) {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const expense = expenses.find((e) => e.id === Number(id));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (spentAt !== undefined) {
    const date = new Date(spentAt);

    if (isNaN(date)) {
      res.sendStatus(400);

      return;
    }

    expense.spentAt = date.toISOString();
  }

  if (title !== undefined) {
    expense.title = title;
  }

  if (amount !== undefined) {
    if (isNaN(Number(amount))) {
      res.sendStatus(400);

      return;
    }
    expense.amount = Number(amount);
  }

  if (category !== undefined) {
    expense.category = category;
  }

  if (note !== undefined) {
    expense.note = note;
  }

  res.send(expense);
}

module.exports = {
  getExpenses,
  createExpenses,
  getExpensesById,
  deleteExpenses,
  updateExpenses,
};
