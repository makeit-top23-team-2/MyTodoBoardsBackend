const services = require('./boards.services');

const { createColumn } = require('../columns/columns.services');

const {
  addBoardToUser,
  deleteBoardAtUser,
} = require('../users/users.services');

const {
  createBoard,
  getAllBoard,
  getSingleBoard,
  updateBoard,
  deleteBoard,
  getAllUserBoards,
} = services;

async function getAllBoardHandler(_req, res) {
  try {
    const boards = await getAllBoard();
    console.log('Showing all boards');
    return res.status(200).json(boards);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(501).json({ error });
  }
}

async function getAllUserBoardsHandler(req, res) {
  const { ownerId } = req.params;
  try {
    const userBoards = await getAllUserBoards(ownerId);
    console.log('Showing all User boards');
    return res.status(200).json(userBoards);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(501).json({ error });
  }
}

async function getSingleBoardHandler(req, res) {
  const { id } = req.params;
  try {
    const board = await getSingleBoard(id);

    if (!board) {
      console.log('Board not found');
      return res.status(404).json({ message: 'Board not found' });
    }
    console.log('Showing Board', board);
    return res.json(board);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function createBoardHandler(req, res) {
  const user = await req.user;
  const tempBoardData = req.body;
  const boardData = { ...tempBoardData, owner: user.id };

  try {
    const board = await createBoard(boardData);
    const todo = await createColumn({
      title: 'To Do',
      board: board.id,
    });
    const doing = await createColumn({
      title: 'Doing',
      board: board.id,
    });
    const done = await createColumn({
      title: 'Done',
      board: board.id,
    });
    const defaultColumns = [todo.id, doing.id, done.id];
    board.columns = defaultColumns;
    await board.save();
    await addBoardToUser(user.id, board.id);
    console.log('Board created');
    return res.status(201).json(board);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}
async function updateBoardHandler(req, res) {
  const { id } = req.params;

  const updateBoardData = req.body;
  try {
    const board = await updateBoard(id, updateBoardData);

    if (!board) {
      console.log('Board not found');
      return res.status(404).json({ message: 'Board not found' });
    }
    console.log('User id:', id, 'Data updated:', updateBoardData);
    return res.json(board);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function deleteBoardHandler(req, res) {
  const { id } = req.params;
  const user = await req.user;
  let board = await getSingleBoard(id);

  if (user.id === board.owner.id.toString()) {
    try {
      await deleteBoardAtUser(user.id, board.id);
      board = await deleteBoard(id);
      if (!board) {
        console.log('Board not found');
        return res.status(404).json({ message: 'Board not found' });
      }

      return res.json({ message: 'Board eliminated' });
    } catch (error) {
      console.error(`[ERROR]: ${error}`);
      return res.status(500).json({ error });
    }
  }
  console.log("Can't delete a board that you don't own");
  return res.status(401).json({ message: 'unAuthorized' });
}

module.exports = {
  getAllBoardHandler,
  getSingleBoardHandler,
  createBoardHandler,
  updateBoardHandler,
  deleteBoardHandler,
  getAllUserBoardsHandler,
};
