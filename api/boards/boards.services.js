const Board = require('./boards.model');

function getAllBoard() {
  return Board.find({});
}

function getSingleBoard(id) {
  return Board.findById(id).populate(
    { path: 'owner', select: 'userName' },
    { path: 'columns', select: 'title' }
  );
}

function getAllUserBoards(owner) {
  return Board.find({ owner });
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

function addColumnToBoard(id, columnId) {
  return Board.findByIdAndUpdate(
    id,
    { $push: { columns: columnId } },
    { new: true }
  );
}

function deleteColumnAtBoard(id, columnId) {
  return Board.findByIdAndUpdate(
    id,
    { $pull: { columns: columnId } },
    { multi: true }
  );
}

module.exports = {
  getAllBoard,
  getSingleBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  addColumnToBoard,
  deleteColumnAtBoard,
  getAllUserBoards,
};
