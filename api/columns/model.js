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

    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    cards: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Column = mongoose.model('Column', ColumnSchema);

module.exports = Column;
