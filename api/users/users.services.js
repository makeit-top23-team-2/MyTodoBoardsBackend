const User = require('./users.model');

function getAllUser() {
  return User.find({});
}

/* function getSingleUser(id) {
  return User.findById(id);
} */

function findUserByEmail(email) {
  return User.findOne({ email });
}

function findUserByUserName(userName) {
  return User.findOne({ userName });
}

function createUser(user) {
  return User.create(user);
}

function updateUser(id, user) {
  return User.findByIdAndUpdate(id, user, { new: true });
}

function deleteUser(id) {
  return User.findByIdAndRemove(id);
}

module.exports = {
  getAllUser,
  // getSingleUser,
  findUserByEmail,
  findUserByUserName,
  createUser,
  updateUser,
  deleteUser,
};
