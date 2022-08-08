const mongoose = require("mongoose");

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
      required: true,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId
      //!required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId
      //!required: true,
    },
    tasks: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Column = mongoose.model("Column", ColumnSchema);

module.exports =  Column ;
