const User = require('./users.model');

function getAllUser() {
  return User.find({});
}

function getSingleUser(id) {
  return User.findById(id).populate({ path: 'cards', select: 'title' });
}

function findOneUser(query) {
  return User.findOne(query);
}

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

function addBoardToUser(id, boardId) {
  return User.findByIdAndUpdate(
    id,
    { $push: { boards: boardId } },
    { new: true }
  );
}

function addBoardToCollaborator(id, boardId) {
  return User.findByIdAndUpdate(
    id,
    { $push: { sharedBoards: boardId } },
    { new: true }
  );
}

function deleteBoardAtUser(id, boardId) {
  return User.findByIdAndUpdate(
    id,
    { $pull: { boards: boardId } },
    { multi: true }
  );
}

module.exports = {
  getSingleUser,
  getAllUser,
  findOneUser,
  findUserByEmail,
  findUserByUserName,
  addBoardToUser,
  deleteBoardAtUser,
  createUser,
  updateUser,
  deleteUser,
  addBoardToCollaborator,
};
