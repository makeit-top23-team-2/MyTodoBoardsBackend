const services = require('./cards.services');

const {
  addCardToColumn,
  deleteCardAtColumn,
} = require('../columns/columns.services');

const { createCard, getAllCard, getSingleCard, updateCard, deleteCard } =
  services;

async function getAllCardHandler(req, res) {
  try {
    const cards = await getAllCard();
    console.log('Showing all cards');
    return res.status(200).json(cards);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(501).json({ error });
  }
}

async function getSingleCardHandler(req, res) {
  const { id } = req.params;
  try {
    const Card = await getSingleCard(id);

    if (!Card) {
      console.log('Card not found');
      return res.status(404).json({ message: 'Card not found' });
    }
    console.log('Showing card', Card);
    return res.json(Card);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function createCardHandler(req, res) {
  const { columnId } = req.params;
  const cardData = req.body;

  try {
    const card = await createCard(cardData);
    console.log(
      '🚀 ~ file: cards.controller.js ~ line 45 ~ createCardHandler ~ card',
      card
    );
    await addCardToColumn(columnId, card.id);
    console.log('Card created', card);
    return res.status(201).json(card);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function updateCardHandler(req, res) {
  const { id } = req.params;
  const cardData = req.body;

  try {
    if (cardData.files) {
      const cardFileNew = await getSingleCard(id);
      cardData.files = cardData.files.concat(cardFileNew.files);
    }
    const card = await updateCard(id, cardData);
    console.log('User id:', id, 'Data updated:', cardData);
    return res.status(200).json(card);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ message: 'Error updating card' });
  }
}

async function deleteCardHandler(req, res) {
  const { id } = req.params;

  try {
    const card = await getSingleCard(id);
    if (!card) {
      return res.status(401).json({ message: 'Card not found' });
    }
    await deleteCardAtColumn(id, card.id);
    await deleteCard(id);
    console.log(`Card ${id} eliminated`);
    return res.status(200).json({ message: 'Card deleted' });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ message: 'Error' });
  }
}

module.exports = {
  getAllCardHandler,
  getSingleCardHandler,
  createCardHandler,
  updateCardHandler,
  deleteCardHandler,
};
