const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: string,
      required: true,
    },
    description: {
      type: string,
    },
    img: {
      type: string,
    },
    users: {
      type: array,
      required: true,
    },
    deadline: {
      type: date,
    },
    column: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    url: {
      type: string,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = { Task };
