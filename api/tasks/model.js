const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId
      //!required: true,
    },
    users: {
      type: Array,
      //!required: true,
    },
    deadline: {
      type: Date,
    },
    column: {
      type: mongoose.Schema.Types.ObjectId,
      //! required: true,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task ;
