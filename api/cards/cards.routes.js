const express = require('express');
const { isAuthenticated } = require('../middlewares/auth/auth.services');

const controller = require('./cards.controller');

const {
  createCardHandler,
  getAllCardHandler,
  getSingleCardHandler,
  updateCardHandler,
  deleteCardHandler,
} = controller;

const router = express.Router();

router.get('/', getAllCardHandler);
router.post('/', isAuthenticated, createCardHandler);
router.get('/:id', getSingleCardHandler);
router.patch('/:id', isAuthenticated, updateCardHandler);
router.delete('/:id', isAuthenticated, deleteCardHandler);

module.exports = router;
