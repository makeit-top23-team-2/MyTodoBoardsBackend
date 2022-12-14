const services = require('./boards.services');

const { createColumn } = require('../columns/columns.services');

const { sendMailSendGrid } = require('../../utils/mail');

const {
  addBoardToUser,
  deleteBoardAtUser,
  addBoardToCollaborator,
  findUserByEmail,
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
  const { id } = req.user;
  try {
    const userBoards = await getAllUserBoards(id);
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
  const { id } = req.user;
  const tempBoardData = req.body;
  const boardData = { ...tempBoardData, owner: id };

  try {
    const board = await createBoard(boardData);

    const todo = await createColumn({
      title: 'To Do',
      board: board.id,
      inputId: Date.now(),
    });

    const doing = await createColumn({
      title: 'Doing',
      board: board.id,
      inputId: Date.now(),
    });
    const done = await createColumn({
      title: 'Done',
      board: board.id,
      inputId: Date.now(),
    });

    const defaultColumns = [todo.id, doing.id, done.id];
    board.columns = defaultColumns;
    await board.save();
    await addBoardToUser(id, board.id);
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
  try {
    let board = await getSingleBoard(id);

    if (user.id === board.owner.id.toString()) {
      await deleteBoardAtUser(user.id, board.id);

      board = await deleteBoard(id);
      if (!board) {
        console.log('Board not found');
        return res.status(404).json({ message: 'Board not found' });
      }

      return res.json({ message: 'Board eliminated' });
    }
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }

  console.log("Can't delete a board that you don't own");
  return res.status(401).json({ message: 'Unauthorized' });
}

async function AddCollaboratorsHandler(req, res) {
  const { user } = req;
  const { boardId } = req.params;
  const { email } = req.body;

  try {
    const board = await getSingleBoard(boardId);
    const collaborator = await findUserByEmail(email);

    if (!collaborator) {
      console.log('This email address is not registered in Trello.');
      return res.status(404).json({
        status: 404,
        message: 'This email address is not registered in Trello!',
      });
    }
    const { id } = collaborator;

    board.collaborators.push(id);
    await addBoardToCollaborator(id, boardId);
    await board.save();

    const message = {
      from: '"no-reply" <clon.frello@gmail.com>',
      to: collaborator.email,
      template_id: 'd-bf1b6019d4aa495085119859a2096372',
      dynamic_template_data: {
        name: user.name.capitalize(),
        lastName: user.lastName.capitalize(),
        url: `${process.env.FRONTEND_URL}/board/${boardId}`,
      },
    };

    await sendMailSendGrid(message);

    console.log(`Collaborator ${id} added to board ${boardId}`);
    return res.status(200).json({
      status: 200,
      message: `Collaborator ${id} added to board ${boardId}`,
    });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ status: 500, error });
  }
}

module.exports = {
  getAllBoardHandler,
  getSingleBoardHandler,
  createBoardHandler,
  updateBoardHandler,
  deleteBoardHandler,
  getAllUserBoardsHandler,
  AddCollaboratorsHandler,
};
