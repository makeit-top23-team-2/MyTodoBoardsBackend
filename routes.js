/**
 * Main application routes
 */
const healthcheck = require('./api/healthcheck/index');
const user = require('./api/users/routes');
const board = require('./api/boards/routes');
const card = require('./api/cards/routes');
const column = require('./api/columns/routes');
const auth = require('./api/middlewares/auth/routes');

function routes(app) {
  app.use('/api/healthcheck', healthcheck);
  app.use('/api/users', user);
  app.use('/api/boards', board);
  app.use('/api/cards', card);
  app.use('/api/columns', column);
  app.use('/auth/', auth);
}

module.exports = routes;
