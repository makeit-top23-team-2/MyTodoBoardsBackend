const services = require('./services.js');

const {
  createTask,
  getAllTask,
  findTaskById
} = services;

async function getAllTaskHandler(req, res) {
  try {
    const tasks = await getAllTask()
    return res.status(200).json(tasks)
  } catch (error) {
    return res.status(501).json({ error })
  }
}

async function getSingleTaskHandler(req, res) {
  const { id } = req.params
  try {
    const task = await getSingleTask(id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    return res.json(task)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

async function createTaskHandler(req, res) {
  const taskData = req.body

  try {
    const task = await createTask(taskData)
    return res.status(201).json(task)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

module.exports = {
  getAllTaskHandler,
  getSingleTaskHandler,
  createTaskHandler,
}