const Board = require('./boards.model');

function getAllBoard() {
  return Board.find({});
}

function getSingleBoard(id) {
  return Board.findById(id);
}

function createBoard(board) {
  return Board.create(board);
}

function updateBoard(id, board) {
  return Board.findByIdAndUpdate(id, board, { new: true });
}

function deleteBoard(id) {
  return Board.findByIdAndDelete(id);
}

module.exports = {
  getAllBoard,
  getSingleBoard,
  createBoard,
  updateBoard,
  deleteBoard,
};
