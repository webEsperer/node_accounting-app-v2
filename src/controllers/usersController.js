function getUsers(req, res) {
  res.send(req.app.locals.users);
}

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: req.app.locals.nextUserId++,
    name,
  };

  req.app.locals.users.push(newUser);

  res.status(201).send(newUser);
}

function getUserById(req, res) {
  const { id } = req.params;

  const user = req.app.locals.users.find((u) => u.id === Number(id));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
}

function deleteUser(req, res) {
  const { id } = req.params;

  const userIndex = req.app.locals.users.findIndex((u) => u.id === Number(id));

  if (userIndex === -1) {
    res.sendStatus(404);

    return;
  }

  req.app.locals.users.splice(userIndex, 1);
  res.sendStatus(204);
}

function updateUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const user = req.app.locals.users.find((u) => u.id === Number(id));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  user.name = name;

  res.send(user);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
