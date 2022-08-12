/**
 * Controller for user
 */

const services = require('./services.js');
const bcrypt = require('bcrypt');
require('dotenv').config();

const SALT_ROUNDS = process.env.SALT_ROUNDS;


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
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(userData.password, salt);
  userData.password = hah;

  try {
    const user = await createUser(userData)
    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

function updateUserHandler(req, res) {}

function deleteUserHandler(req, res) {}

module.exports = {
  getAllUserHandler,
  getSingleUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
}