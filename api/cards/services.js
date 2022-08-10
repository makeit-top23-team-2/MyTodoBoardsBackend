const Task = require('./model.js');

function getAllTask() {
  return Task.find({})
}

function getSingleTask(id) {
  return Task.findById(id)
}

function createTask(task) {
  return Task.create(task)
}

module.exports = {
  getAllTask,
  getSingleTask,
  createTask
}