const express = require('express');

const controller = require('./controller.js');
const {
  createBoardHandler,
  getAllBoardHandler,
  getSingleBoardHandler,
} = controller;

const router = express.Router();

router.get('/', getAllBoardHandler)
router.post('/', createBoardHandler)
router.get('/:id', getSingleBoardHandler)
//router.patch('/:id', updateBoardHandler)
//router.delete('/:id', deleteBoardHandler)

module.exports =  router ;