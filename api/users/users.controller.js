const crypto = require('crypto');

const services = require('./users.services');

const { createUser, getAllUser, getSingleUser, updateUser, deleteUser } =
  services;

const { sendMailSendGrid } = require('../../utils/mail');

async function getAllUserHandler(req, res) {
  try {
    const users = await getAllUser();
    return res.status(200).json(users);
  } catch (error) {
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
      subject: 'Welcome to Trello! Activate your Account Now.', // Subject line
      template_id: 'd-a6a296f04ab4420d87f8758c4b635fbb', // template id
      dynamic_template_data: {
        name: user.profile.name.capitalize(),
        lastName: user.profile.lastName.capitalize(),
        url: `${process.env.FRONTEND_URL}/verify-account/${hash}`,
      },
    };

    await sendMailSendGrid(message);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function updateUserHandler(req, res) {
  const { newUser } = req.body;
  const { id } = req.params;
  try {
    await updateUser(id, newUser);
    return res.status(200).json({ message: 'User updated' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error });
  }
}

async function deleteUserHandler(req, res) {
  const { user } = req;
  const { id } = req.params;
  if (!(user.id === id)) {
    return res.status(401).json({ message: 'unAuthorized' });
  }
  try {
    await deleteUser(id);
    return res.status(200).json({ message: 'User eliminated' });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  getAllUserHandler,
  getSingleUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
