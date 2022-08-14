/**
 * User API
 */
const express = require('express');
const controller = require('./controller.js');

const { isAuthenticated } = require('../middlewares/auth/services');
const {
  createUserHandler,
  deleteUserHandler,
  getAllUserHandler,
  getSingleUserHandler,
  updateUserHandler,
} = controller;

const router = express.Router();

router.get('/', getAllUserHandler)
router.post('/', createUserHandler)
router.get('/:id', getSingleUserHandler)
router.patch('/:id',isAuthenticated, updateUserHandler)
router.delete('/:id', isAuthenticated, deleteUserHandler)

module.exports =  router ;