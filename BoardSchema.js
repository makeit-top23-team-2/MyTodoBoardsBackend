//* 1 Se importa mongoose
const mongoose = require("mongoose");

//* 2 Crear el Schema  mongoose.schema( obj, timestamps )
const BoardSchema = new mongoose.Schema(
  {
    title: {
      type: string,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    color: {
      type: string,
      required: true,
    },
    image: {
      type: string,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    contributors: {
      type: array,
      default: [], //!
    },
    columns: {
      type: array,
      default: [], //!
    },
    url: {
      type: string,
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
