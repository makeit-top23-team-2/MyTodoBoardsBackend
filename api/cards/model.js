const mongoose = require("mongoose");

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
      ref: "Board",
      required: true
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      }
    ],
     /* 
    users: {
      type: Array,
      default: []
    },
    */
    deadline: {
      type: Date,
    },
    column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
      required: true,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("Task", CardSchema);

module.exports = Task ;



















z

