const express = require('express');
const { isAuthenticated } = require('../middlewares/auth/auth.services');

const controller = require('./columns.controller');

const {
  createColumnHandler,
  getAllColumnHandler,
  getSingleColumnHandler,
  updateColumnHandler,
  deleteColumnHandler,
} = controller;

const router = express.Router();

router.get('/', getAllColumnHandler);
router.get('/:id', getSingleColumnHandler);
router.post('/', isAuthenticated, createColumnHandler);
router.patch('/:id', isAuthenticated, updateColumnHandler);
router.delete('/:id', isAuthenticated, deleteColumnHandler);

module.exports = router;
