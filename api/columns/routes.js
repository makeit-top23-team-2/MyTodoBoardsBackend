const express = require('express');

const controller = require('./controller.js');
const {
  createColumnHandler,
  getAllColumnHandler,
  getSingleColumnHandler,
  updateColumnHandler,
  deleteColumnHandler
} = controller;

const router = express.Router();

router.get('/', getAllColumnHandler)
router.post('/', createColumnHandler)
router.get('/:id', getSingleColumnHandler)
router.patch('/:id', updateColumnHandler)
router.delete('/:id', deleteColumnHandler)

module.exports =  router ;