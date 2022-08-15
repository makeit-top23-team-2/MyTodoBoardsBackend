const express = require('express');

const controller = require('./controller.js');
const {
  createCardHandler,
  getAllCardHandler,
  getSingleCardHandler,
  updateCardHandler
} = controller;

const router = express.Router();

router.get('/', getAllCardHandler)
router.post('/', createCardHandler)
router.get('/:id', getSingleCardHandler)
router.patch('/:id', updateCardHandler)
//router.delete('/:id', deleteTaskHandler)

module.exports =  router ;