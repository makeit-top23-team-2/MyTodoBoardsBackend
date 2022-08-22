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
    console.log('Showing all columns');
    const columns = await getAllColumn();
    return res.status(200).json(columns);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(501).json({ error });
  }
}

async function getSingleColumnHandler(req, res) {
  const { id } = req.params;
  try {
    const column = await getSingleColumn(id);
    if (!column) {
      console.log('Column not found');
      return res.status(404).json({ message: 'Column not found' });
    }
    console.log('Showing column', column);
    return res.json(column);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function createColumnHandler(req, res) {
  const { id } = req.params;
  let columnData = req.body;
  columnData = { ...columnData, board: id };
  try {
    const column = await createColumn(columnData);
    console.log('Column created', column);
    return res.status(201).json(column);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function updateColumnHandler(req, res) {
  const { id } = req.params;
  const columnData = req.body;
  try {
    const column = await updateColumn(id, columnData);
    if (!column) {
      console.log('Column not found');
      return res.status(404).json({ message: 'Column not found' });
    }
    console.log('Column id:', id, 'Data updated:', columnData);
    return res.json(column);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function deleteColumnHandler(req, res) {
  const { id } = req.params;
  try {
    const column = await deleteColumn(id);
    if (!column) {
      console.log('Column not found');
      return res.status(404).json({ message: 'Column not found' });
    }
    console.log(`Column ${id} eliminated`);
    return res.json(column);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
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
