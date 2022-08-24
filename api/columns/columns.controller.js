const services = require('./columns.services');

const {addColumnToBoard, deleteColumnAtBoard} = require('../boards/boards.services')

const {
  createColumn,
  getAllColumn,
  getSingleColumn,
  updateColumn,
  deleteColumn,
  getColumnByBoard,
  createColumnByBoard,
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
    await addColumnToBoard(id,column.id)
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
    const column = await getSingleColumn(id)
    if (!column) {
      console.log('Column not found');
      return res.status(404).json({ message: 'Column not found' });
    }
    await deleteColumnAtBoard(id, column.board);
    await deleteColumn(id);
    console.log(`Column ${id} eliminated`);
    return res.json({message: "Column deleted successfully"});
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function getColumnByBoardHandler(req, res) {
  const { id } = req.params;
  try {
    const columns = await getColumnByBoard(id);
    if (!columns) {
      console.log('Columns not found');
      return res.status(404).json({ message: 'Columns not found' });
    }
    console.log('Showing columns', columns);
    return res.json(columns);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function createColumnByBoardHandler(req, res) {
  const { id } = req.params;
  const columnData = req.body;
  try {
    const column = await createColumnByBoard(id, columnData);
    console.log('Column created', column);
    return res.status(201).json(column);
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
  getColumnByBoardHandler,
  createColumnByBoardHandler,
};
