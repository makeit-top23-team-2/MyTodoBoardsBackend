const express = require('express');
import {isAuthenticated} from '../../middleware/auth'

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
router.post('/', isAuthenticated, createColumnHandler)
router.patch('/:id', isAuthenticated, updateColumnHandler)
router.delete('/:id', isAuthenticated, deleteColumnHandler)

module.exports =  router ;