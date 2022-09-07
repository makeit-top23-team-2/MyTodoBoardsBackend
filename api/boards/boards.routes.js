const express = require('express');
const { isAuthenticated } = require('../../auth/auth.services');
const {
  createBoardHandler,
  getAllBoardHandler,
  getSingleBoardHandler,
  updateBoardHandler,
  deleteBoardHandler,
  getAllUserBoardsHandler,
  AddCollaboratorsHandler,
} = require('./boards.controller');

const router = express.Router();

router.get('/', getAllBoardHandler);
router.get('/user', isAuthenticated, getAllUserBoardsHandler);
router.get('/:id', getSingleBoardHandler);
router.post('/', isAuthenticated, createBoardHandler);
router.patch('/:id', isAuthenticated, updateBoardHandler);
router.put('/:boardId', isAuthenticated, AddCollaboratorsHandler);
router.delete('/:id', isAuthenticated, deleteBoardHandler);

module.exports = router;
