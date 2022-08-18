const services = require('./cards.services');

const { createCard, getAllCard, getSingleCard, updateCard, deleteCard } =
  services;

async function getAllCardHandler(req, res) {
  try {
    const cards = await getAllCard();
    return res.status(200).json(cards);
  } catch (error) {
    return res.status(501).json({ error });
  }
}

async function getSingleCardHandler(req, res) {
  const { id } = req.params;
  try {
    const Card = await getSingleCard(id);

    if (!Card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    return res.json(Card);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function createCardHandler(req, res) {
  const CardData = req.body;

  try {
    const card = await createCard(CardData);
    return res.status(201).json(card);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function updateCardHandler(req, res) {
  const { id } = req.params;
  const cardData = req.body;

  try {
    const card = await updateCard(id, cardData);
    return res.status(200).json({ message: 'Card updated' }, card);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating card' });
  }
}

async function deleteCardHandler(req, res) {
  const { id } = req.params;

  try {
    const card = await deleteCard(id);
    if (!card) {
      return res.status(401).json({ message: 'Card not found' });
    }

    return res.status(200).json({ message: 'Card deleted' });
  } catch (error) {
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
