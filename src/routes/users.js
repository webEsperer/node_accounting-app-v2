const express = require('express');

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController.js');

const router = express.Router();

router.get('/', getUsers);

router.post('/', express.json(), createUser);

router.get('/:id', getUserById);

router.delete('/:id', deleteUser);

router.patch('/:id', express.json(), updateUser);

module.exports = router;
