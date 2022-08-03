//* 1 Se importa mongoose
const mongoose = require("mongoose");

//* 2 Crear el Schema
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: string,
      required: true,
    },
    email: {
      type: string,
      required: true,
    },
    password: {
      //!
      type: string,
      required: true,
    },
    name: {
      type: string,
      required: true,
    },
    lastName: {
      type: string,
      required: true,
    },
    boards: {
      type: array,
      default: [], //!
    },
    tasks: {
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
const User = mongoose.model("User", UserSchema);

//* 4 se exporta el modelo
module.exports = { User };
