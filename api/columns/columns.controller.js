const services = require('./columns.services');

const {
  createColumn,
  getAllColumn,
  getSingleColumn,
  updateColumn,
  deleteColumn,
} = services;

async function getAllColumnHandler(req, res) {
  try {
    const columns = await getAllColumn();
    return res.status(200).json(columns);
  } catch (error) {
    return res.status(501).json({ error });
  }
}

async function getSingleColumnHandler(req, res) {
  const { id } = req.params;
  try {
    const column = await getSingleColumn(id);
    if (!column) {
      return res.status(404).json({ message: 'Column not found' });
    }

    return res.json(column);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function createColumnHandler(req, res) {
  const { id } = req.params;
  let columnData = req.body;
  columnData = { ...columnData, board: id };
  try {
    const column = await createColumn(columnData);
    return res.status(201).json(column);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function updateColumnHandler(req, res) {
  const { id } = req.params;
  const columnData = req.body;
  try {
    const column = await updateColumn(id, columnData);
    if (!column) {
      return res.status(404).json({ message: 'Column not found' });
    }

    return res.json(column);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deleteColumnHandler(req, res) {
  const { id } = req.params;
  try {
    const column = await deleteColumn(id);
    if (!column) {
      return res.status(404).json({ message: 'Column not found' });
    }

    return res.json(column);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  getAllColumnHandler,
  getSingleColumnHandler,
  createColumnHandler,
  updateColumnHandler,
  deleteColumnHandler,
};
