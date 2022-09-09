const express = require('express');
const { isAuthenticated } = require('../../auth/auth.services');

const controller = require('./cards.controller');

const {
  createCardHandler,
  getAllCardHandler,
  getSingleCardHandler,
  updateCardHandler,
  deleteCardHandler,
  deleteFileHandler
} = controller;

const router = express.Router();

router.get('/', getAllCardHandler);
router.post('/:columnId', isAuthenticated, createCardHandler);
router.get('/:id', getSingleCardHandler);
router.patch('/:id', isAuthenticated, updateCardHandler);
router.delete('/file/:id', isAuthenticated, deleteFileHandler);
router.delete('/:id', isAuthenticated, deleteCardHandler);

module.exports = router;
