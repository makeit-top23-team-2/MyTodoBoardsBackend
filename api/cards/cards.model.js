const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    img: {
      type: String,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    deadline: {
      type: Date,
    },
    column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Column',
      required: true,
    },
    url: {
      type: String,
    },
    checklist: {
      type: Array,
    },
    files: [
      {
        name: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
