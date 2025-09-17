const users = [];

function getUsers(req, res) {
  res.send(users);
}

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  res.status(201).send(newUser);
}

function getUserById(req, res) {
  const { id } = req.params;

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
}

function deleteUser(req, res) {
  const { id } = req.params;

  const userIndex = users.findIndex((u) => u.id === Number(id));

  if (userIndex === -1) {
    res.sendStatus(404);

    return;
  }

  users.splice(userIndex, 1);
  res.sendStatus(204);
}

function updateUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const user = users.find((u) => u.id === Number(id));

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
  users,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
