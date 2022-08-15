const services = require("./services.js");

const { createColumn } = require("../columns/services.js");

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
      return res.status(404).json({ message: "Board not found" });
    }

    return res.json(board);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function createBoardHandler(req, res) {
  const user = await req.user;
  const tempBoardData = req.body;
  const boardData1 = { ...tempBoardData, owner: user.id };

  try {
    const boardData2 = await createBoard(boardData1);
    const ToDo = await createColumn({
      title: "To Do",
      board: boardData2.id,
    });
    const Doing = await createColumn({
      title: "Doing",
      board: boardData2.id,
    });
    const Done = await createColumn({
      title: "Done",
      board: boardData2.id,
    });
    const columns = [ToDo.id, Doing.id, Done.id];
    console.log(
      "🚀 ~ file: controller.js ~ line 53 ~ createBoardHandler ~ columns",
      columns
    );

    const board = await updateBoard(boardData2.id, { columns: columns });
    console.log(
      "🚀 ~ file: controller.js ~ line 56 ~ createBoardHandler ~ { ...boardData2, columns }",
      { ...boardData2, columns }
    );
    return res.status(201).json(board);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
async function updateBoardHandler(req, res) {
  const { id } = req.params;

  const boardData = req.body;
  try {
    const board = await updateBoard(id, boardData);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    return res.json(board);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deleteBoardHandler(req, res) {
  const { id } = req.params;
  const user = await req.user;
  const board = await getSingleBoard(id);

  if (user.id == board.owner) {
    try {
      const board = await deleteBoard(id);
      if (!board) {
        return res.status(404).json({ message: "Board not found" });
      }

      return res.json({ message: "Board eliminated" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  return res.status(401).json({ message: "unAuthorized" });
}

module.exports = {
  getAllBoardHandler,
  getSingleBoardHandler,
  createBoardHandler,
  updateBoardHandler,
  deleteBoardHandler,
};
