const Board = require('./model.js');

function getAllBoard() {
  return Board.find({})
}

function getSingleBoard(id) {
  return Board.findById(id)
}

function createBoard(board) {
  return Board.create(board)
}

module.exports = {
  getAllBoard,
  getSingleBoard,
  createBoard
}