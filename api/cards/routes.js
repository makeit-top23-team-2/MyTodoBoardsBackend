const express = require('express');

const controller = require('./controller.js');
const {
  createTaskHandler,
  getAllTaskHandler,
  getSingleTaskHandler,
} = controller;

const router = express.Router();

router.get('/', getAllTaskHandler)
router.post('/', createTaskHandler)
router.get('/:id', getSingleTaskHandler)
//router.patch('/:id', updateTaskHandler)
//router.delete('/:id', deleteTaskHandler)

module.exports =  router ;