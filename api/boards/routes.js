const express = require('express');

const controller = require('./controller.js');
const { isAuthenticated } = require('../middlewares/auth/services');
const {
  createBoardHandler,
  getAllBoardHandler,
  getSingleBoardHandler,
} = controller;

const router = express.Router();

router.get('/', getAllBoardHandler)
router.post('/', createBoardHandler)
router.get('/:id', getSingleBoardHandler)
//router.patch('/:id',isAuthenticated, updateBoardHandler)
//router.delete('/:id',isAuthenticated, deleteBoardHandler)

module.exports =  router ;