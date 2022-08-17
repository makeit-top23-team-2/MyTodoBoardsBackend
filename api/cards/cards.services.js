const Card = require('./cards.model');

function getAllCard() {
  return Card.find({});
}

function getSingleCard(id) {
  return Card.findById(id);
}

function createCard(card) {
  return Card.create(card);
}

function updateCard(id, card) {
  return Card.findByIdAndUpdate(id, card, { new: true });
}

function deleteCard(id) {
  return Card.findByIdAndRemove(id);
}

module.exports = {
  getAllCard,
  getSingleCard,
  createCard,
  updateCard,
  deleteCard,
};
