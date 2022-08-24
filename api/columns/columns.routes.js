const express = require('express');
const { isAuthenticated } = require('../../auth/auth.services');

const controller = require('./columns.controller');

const {
  createColumnHandler,
  getAllColumnHandler,
  getSingleColumnHandler,
  updateColumnHandler,
  deleteColumnHandler,
  getColumnByBoardHandler,
  createColumnByBoardHandler,
} = controller;

const router = express.Router();

router.get('/', getAllColumnHandler);
router.get('/:id', getSingleColumnHandler);
router.post('/', isAuthenticated, createColumnHandler);
router.patch('/:id', isAuthenticated, updateColumnHandler);
router.delete('/:id', isAuthenticated, deleteColumnHandler);
router.get('/board/:id', getColumnByBoardHandler);
router.post('/board/:id', isAuthenticated,  createColumnByBoardHandler);

module.exports = router;
