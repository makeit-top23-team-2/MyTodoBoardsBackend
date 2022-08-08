const services = require('./services.js');

const {
  createColumn,
  getAllColumn,
  findColumnById
} = services;

async function getAllColumnHandler(req, res) {
  try {
    const columns = await getAllColumn()
    return res.status(200).json(columns)
  } catch (error) {
    return res.status(501).json({ error })
  }
}

async function getSingleColumnHandler(req, res) {
  const { id } = req.params
  try {
    const column = await getSingleColumn(id)

    if (!column) {
      return res.status(404).json({ message: 'Column not found' })
    }

    return res.json(column)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

async function createColumnHandler(req, res) {
  const columnData = req.body

  try {
    const column = await createColumn(columnData)
    return res.status(201).json(column)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

module.exports = {
  getAllColumnHandler,
  getSingleColumnHandler,
  createColumnHandler,
}