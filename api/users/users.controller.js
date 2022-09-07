const crypto = require('crypto');

const services = require('./users.services');

const {
  createUser,
  getAllUser,
  findUserByEmail,
  findUserByUserName,
  getSingleUser,
  updateUser,
  deleteUser,
  getAllSharedBoards,
} = services;

const { sendMailSendGrid } = require('../../utils/mail');

async function getAllUserHandler(req, res) {
  try {
    console.log('Showing all users');
    const users = await getAllUser();
    return res.status(200).json(users);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function getSingleUserHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await getSingleUser(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function getUserByEmailHandler(req, res) {
  const { email } = req.params;
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Showing user', user);
    return res.json(user);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function getAllSharedBoardsHandler(req, res) {
  const { id } = req.user;

  try {
    const user = await getAllSharedBoards(id);
    const { sharedBoards } = user;
    if (!sharedBoards) {
      console.log('No shared Boards found');
      return res.status(404).json({ message: 'No shared Boards found' });
    }
    console.log('Showing all User Shared Boards');
    return res.status(200).json(sharedBoards);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function findUserByUserNameHandler(req, res) {
  const { userName } = req.params;
  try {
    const user = await findUserByUserName(userName);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Showing user', user);
    return res.json(user);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function createUserHandler(req, res) {
  const userData = req.body;

  try {
    const hash = crypto
      .createHash('sha256')
      .update(userData.email)
      .digest('hex');

    userData.passwordResetActivationToken = hash;
    userData.passwordResetActivationExpires = Date.now() + 3_600_000 * 24; // 24 hour

    const user = await createUser(userData);

    // Send email to user
    const message = {
      from: '"no-reply" <clon.frello@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: 'Welcome to Trello!', // Subject line
      preheader: 'Activate your Account Now.',
      template_id: 'd-a6a296f04ab4420d87f8758c4b635fbb', // template id
      dynamic_template_data: {
        name: user.name.capitalize(),
        lastName: user.lastName.capitalize(),
        url: `${process.env.FRONTEND_URL}/activate-account/${hash}`,
      },
    };

    await sendMailSendGrid(message);
    console.log('User created successfully', user);
    return res.status(201).json(user.profile);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function updateUserHandler(req, res) {
  const userUpdate = req.body;
  const { id, email } = req.user;

  try {
    await updateUser(id, userUpdate);
    const user = await findUserByEmail(email);
    console.log('User id:', id, 'Data updated:', userUpdate);
    return res
      .status(200)
      .json({ message: 'User updated', profile: user.profile });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ message: 'Error updating user', error });
  }
}

async function deleteUserHandler(req, res) {
  const { id } = req.user;

  try {
    await deleteUser(id);
    console.log(`User ${id} eliminated`);
    return res.status(200).json({ message: 'User eliminated' });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

module.exports = {
  getAllUserHandler,
  getSingleUserHandler,
  getUserByEmailHandler,
  findUserByUserNameHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getAllSharedBoardsHandler,
};
