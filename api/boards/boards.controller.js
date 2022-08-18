const services = require('./boards.services');

const { createColumn } = require('../columns/columns.services');

const { createBoard, getAllBoard, getSingleBoard, updateBoard, deleteBoard } =
  services;

async function getAllBoardHandler(_req, res) {
  try {
    const boards = await getAllBoard();
    return res.status(200).json(boards);
  } catch (error) {
    return res.status(501).json({ error });
  }
}

async function getSingleBoardHandler(req, res) {
  const { id } = req.params;
  try {
    const board = await getSingleBoard(id);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    return res.json(board);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function createBoardHandler(req, res) {
  const user = await req.user;
  const tempBoardData = req.body;
  const boardData = { ...tempBoardData, owner: user.id };

  try {
    const board = await createBoard(boardData);
    const ToDo = await createColumn({
      title: 'To Do',
      board: board.id,
    });
    const Doing = await createColumn({
      title: 'Doing',
      board: board.id,
    });
    const Done = await createColumn({
      title: 'Done',
      board: board.id,
    });
    const defaultColumns = [ToDo.id, Doing.id, Done.id];
    board.columns = defaultColumns;

    await board.save();

    return res.status(201).json(board);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
async function updateBoardHandler(req, res) {
  const { id } = req.params;

  const updateBoardData = req.body;
  try {
    const board = await updateBoard(id, updateBoardData);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    return res.json(board);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deleteBoardHandler(req, res) {
  const { id } = req.params;
  const user = await req.user;
  let board = await getSingleBoard(id);

  if (user.id === board.owner.toString()) {
    try {
      board = await deleteBoard(id);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }

      return res.json({ message: 'Board eliminated' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  return res.status(401).json({ message: 'unAuthorized' });
}

module.exports = {
  getAllBoardHandler,
  getSingleBoardHandler,
  createBoardHandler,
  updateBoardHandler,
  deleteBoardHandler,
};
