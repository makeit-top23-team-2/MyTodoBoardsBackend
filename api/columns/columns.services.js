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

function getColumnByBoard(id) {
  return Column.find({ board: id });
}

function createColumnByBoard(id, column) {
  return Column.create({ ...column, board: id });
}

module.exports = {
  getAllColumn,
  getSingleColumn,
  createColumn,
  updateColumn,
  deleteColumn,
  getColumnByBoard,
  createColumnByBoard,
};
