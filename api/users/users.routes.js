/**
 * User API
 */
const express = require('express');
const controller = require('./users.controller');

const { registerLogin } = require('./users.joiSchema');
const { isAuthenticated } = require('../../auth/auth.services');

const {
  createUserHandler,
  deleteUserHandler,
  getAllUserHandler,
  getUserByEmailHandler,
  updateUserHandler,
} = controller;

const router = express.Router();

router.get('/', getAllUserHandler);
router.post('/', registerLogin, createUserHandler);
router.get('/:email', getUserByEmailHandler);
router.patch('/:id', isAuthenticated, updateUserHandler);
router.delete('/:id', isAuthenticated, deleteUserHandler);

module.exports = router;
