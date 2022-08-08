const services = require('./services.js');

const {
  createBoard,
  getAllBoard,
  findBoardById
} = services;

async function getAllBoardHandler(req, res) {
  try {
    const boards = await getAllBoard()
    return res.status(200).json(boards)
  } catch (error) {
    return res.status(501).json({ error })
  }
}

async function getSingleBoardHandler(req, res) {
  const { id } = req.params
  try {
    const board = await getSingleBoard(id)

    if (!board) {
      return res.status(404).json({ message: 'Board not found' })
    }

    return res.json(board)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

async function createBoardHandler(req, res) {
  const boardData = req.body

  try {
    const board = await createBoard(boardData)
    return res.status(201).json(board)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

module.exports = {
  getAllBoardHandler,
  getSingleBoardHandler,
  createBoardHandler,
}