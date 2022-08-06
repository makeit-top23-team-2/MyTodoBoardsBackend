/**
 * User API
 */
const express = require('express');

const controller = require('./controller.js');
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
router.patch('/:id', updateUserHandler)
router.delete('/:id', deleteUserHandler)

module.exports =  router ;