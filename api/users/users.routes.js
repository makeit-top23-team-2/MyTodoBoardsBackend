/**
 * User API
 */
const express = require('express');
const controller = require('./users.controller');

const { registerLogin } = require('./users.joiSchema');
const { isAuthenticated } = require('../middlewares/auth/auth.services');

const {
  createUserHandler,
  deleteUserHandler,
  getAllUserHandler,
  getSingleUserHandler,
  updateUserHandler,
} = controller;

const router = express.Router();

router.get('/', getAllUserHandler);
router.post('/', registerLogin, createUserHandler);
router.get('/:id', getSingleUserHandler);
router.patch('/:id', isAuthenticated, updateUserHandler);
router.delete('/:id', isAuthenticated, deleteUserHandler);

module.exports = router;
