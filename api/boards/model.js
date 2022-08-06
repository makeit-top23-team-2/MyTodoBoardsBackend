//* 1 Se importa mongoose
const mongoose = require("mongoose");

//* 2 Crear el Schema  mongoose.schema( obj, timestamps )
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
      required: true,
    },
    image: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId
      //required: true,
    },
    contributors: {
      type: Array,
      default: [],
    },
    columns: {
      type: Array,
      default: [],
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//* 3 se asigna el schema al modelo
const Board = mongoose.model("Board", BoardSchema);

//* 4 se exporta el modelo
module.exports = { Board };
