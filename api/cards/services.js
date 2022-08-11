const Card = require('./model.js');

function getAllCard() {
  return Card.find({})
}

function getSingleCard(id) {
  return Card.findById(id)
}

function createCard(card) {
  return Card.create(card)
}

module.exports = {
  getAllCard,
  getSingleCard,
  createCard
}