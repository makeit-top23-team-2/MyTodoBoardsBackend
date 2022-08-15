/**
 * Controller for user
 */

const services = require('./services.js');

const {
  createUser,
  getAllUser,
  getSingleUser,
  findUserByEmail,
  updateUser,
  deleteUser,
} = services;

async function getAllUserHandler(req, res) {
  try {
    const users = await getAllUser()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

async function getSingleUserHandler(req, res) {
  const { id } = req.params
  try {
    const user = await getSingleUser(id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.json(user)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

async function createUserHandler(req, res) {
  const userData = req.body

  try {
    const user = await createUser(userData)
    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

function updateUserHandler(req, res) {
  const { newUser } = req.body;
  const { id } = req.params;
  try {
    updateUser(id, newUser);
    return res.status(200).json({ message: 'User updated' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user' , error});
  }
}

function deleteUserHandler(req, res) {
  const { user } = req.body;
  const { id } = req.params;
  if (!user.id === id){
    return res.status(401).json({ message: 'unAuthorized' })
  }
  try {
    deleteUser(user.id);
    return res.status(200).json({ message: 'OK' });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  getAllUserHandler,
  getSingleUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
}