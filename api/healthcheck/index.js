/**
 * Healthcheck API
 * @module api/healthcheck
 */
const express = require("express");

const router = express.Router();

router.get("/", (_, res) => {
  res.json({ message: "This server is running!!" });
});

module.exports =  router ;
