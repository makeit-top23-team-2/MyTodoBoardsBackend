const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    color: {
      type: String,
      default: 'blue',
    },
    inputId: {
      type: Number,
      required: true,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Column = mongoose.model('Column', ColumnSchema);

module.exports = Column;
