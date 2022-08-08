const Column = require('./model.js');

function getAllColumn() {
  return Column.find({})
}

function getSingleColumn(id) {
  return Column.findById(id)
}

function createColumn(column) {
  return Column.create(column)
}

module.exports = {
  getAllColumn,
  getSingleColumn,
  createColumn
}