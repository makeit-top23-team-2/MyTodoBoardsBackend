/**
 * Main application routes
 */
const healthcheck = require("./api/healthcheck/index.js");
const user = require("./api/users/routes.js");
const board = require("./api/boards/routes.js");
const task = require("./api/tasks/routes.js");

function routes(app) {
  app.use("/api/healthcheck", healthcheck);
  app.use("/api/users", user);
  app.use("/api/boards",board);
  //app.use("/api/tasks", task);
}

module.exports = routes ;
