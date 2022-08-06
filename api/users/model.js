//* 1 Se importa mongoose
const mongoose = require("mongoose");

//* 2 Crear el Schema
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    boards: {
      type: Array,
      default: [],
    },
    tasks: {
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
const User = mongoose.model("User", UserSchema);

//* 4 se exporta el modelo
module.exports =  User ;
