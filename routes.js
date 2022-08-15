/**
 * Main application routes
 */
const healthcheck = require("./api/healthcheck/index.js");
const user = require("./api/users/routes.js");
const board = require("./api/boards/routes.js");
const card = require("./api/cards/routes.js");
const column = require("./api/columns/routes.js");
const auth = require("./api/middlewares/auth/routes.js");

function routes(app) {
  app.use("/api/healthcheck", healthcheck);
  app.use("/api/users", user);
  app.use("/api/boards", board);
  app.use("/api/cards", card);
  app.use("/api/columns", column);
  app.use("/auth/", auth);
}

module.exports = routes;
