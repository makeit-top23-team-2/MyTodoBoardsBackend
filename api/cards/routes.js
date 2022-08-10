const express = require('express');

const controller = require('./controller.js');
const {
  createCardHandler,
  getAllCardHandler,
  getSingleCardHandler,
} = controller;

const router = express.Router();

router.get('/', getAllCardHandler)
router.post('/', createCardHandler)
router.get('/:id', getSingleCardHandler)
//router.patch('/:id', updateTaskHandler)
//router.delete('/:id', deleteTaskHandler)

module.exports =  router ;