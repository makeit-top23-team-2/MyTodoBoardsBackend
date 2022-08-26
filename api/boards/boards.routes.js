const express = require('express');
const { isAuthenticated } = require('../../auth/auth.services');
const {
  createBoardHandler,
  getAllBoardHandler,
  getSingleBoardHandler,
  updateBoardHandler,
  deleteBoardHandler,
  getAllUserBoardsHandler,
} = require('./boards.controller');

const router = express.Router();

router.get('/', getAllBoardHandler);
router.get('/user:ownerId', getAllUserBoardsHandler);
router.get('/:id', getSingleBoardHandler);
router.post('/', isAuthenticated, createBoardHandler);
router.patch('/:id', isAuthenticated, updateBoardHandler);
router.delete('/:id', isAuthenticated, deleteBoardHandler);

module.exports = router;
