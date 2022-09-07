/**
 * User API
 */
const express = require('express');
const controller = require('./users.controller');

const { registerLogin, userUpdateValidation } = require('./users.joiSchema');
const { isAuthenticated } = require('../../auth/auth.services');

const {
  createUserHandler,
  getSingleUserHandler,
  deleteUserHandler,
  getAllUserHandler,
  getUserByEmailHandler,
  findUserByUserNameHandler,
  updateUserHandler,
  getAllSharedBoardsHandler,
} = controller;

const router = express.Router();

router.get('/', getAllUserHandler);
router.get('/shared-boards', isAuthenticated, getAllSharedBoardsHandler);
router.get('/:id', getSingleUserHandler);
router.get('/user/:userName', findUserByUserNameHandler);
router.post('/', registerLogin, createUserHandler);
router.get('/email/:email', getUserByEmailHandler);
router.patch('/', userUpdateValidation, isAuthenticated, updateUserHandler);
router.delete('/', isAuthenticated, deleteUserHandler);

module.exports = router;
