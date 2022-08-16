const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema(
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
    image: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    contributors: {
      type: Array,
      default: [],
    },
    columns: {
      type: Array,
      ref: 'Columns',
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
