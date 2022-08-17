const express = require('express');
const { isAuthenticated } = require('../middlewares/auth/auth.services');
const {
  createBoardHandler,
  getAllBoardHandler,
  getSingleBoardHandler,
  updateBoardHandler,
  deleteBoardHandler,
} = require('./boards.controller');

const router = express.Router();

router.get('/', getAllBoardHandler);
router.post('/', isAuthenticated, createBoardHandler);
router.get('/:id', getSingleBoardHandler);
router.patch('/:id', isAuthenticated, updateBoardHandler);
router.delete('/:id', isAuthenticated, deleteBoardHandler);

module.exports = router;
