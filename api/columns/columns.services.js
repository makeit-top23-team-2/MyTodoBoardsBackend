const Column = require('./columns.model');

function getAllColumn() {
  return Column.find({});
}

function getSingleColumn(id) {
  return Column.findById(id);
}

function createColumn(column) {
  return Column.create(column);
}

function updateColumn(id, column) {
  return Column.findByIdAndUpdate(id, column);
}

function deleteColumn(id) {
  return Column.findByIdAndDelete(id);
}

module.exports = {
  getAllColumn,
  getSingleColumn,
  createColumn,
  updateColumn,
  deleteColumn,
};
