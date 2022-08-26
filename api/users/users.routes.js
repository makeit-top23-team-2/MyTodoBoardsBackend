/**
 * User API
 */
const express = require('express');
const controller = require('./users.controller');

const { registerLogin } = require('./users.joiSchema');
const { isAuthenticated } = require('../../auth/auth.services');

const {
  createUserHandler,
  getSingleUserHandler,
  deleteUserHandler,
  getAllUserHandler,
  getUserByEmailHandler,
  findUserByUserNameHandler,
  updateUserHandler,
} = controller;

const router = express.Router();

router.get('/', getAllUserHandler);
router.get('/:id', getSingleUserHandler);
router.get('/user/:userName', findUserByUserNameHandler);
router.post('/', registerLogin, createUserHandler);
router.get('/email/:email', getUserByEmailHandler);
router.patch('/:id', isAuthenticated, updateUserHandler);
router.delete('/:id', isAuthenticated, deleteUserHandler);

module.exports = router;
