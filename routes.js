/**
 * Main application routes
 */
const healthcheck = require('./api/healthcheck/index');
const user = require('./api/users/users.routes');
const board = require('./api/boards/boards.routes');
const card = require('./api/cards/cards.routes');
const column = require('./api/columns/columns.routes');
const authLocal = require('./auth/local/local.routes');
const upload = require('./api/upload/upload.routes');

function routes(app) {
  app.use('/api/healthcheck', healthcheck);
  app.use('/api/users', user);
  app.use('/api/boards', board);
  app.use('/api/cards', card);
  app.use('/api/columns', column);
  app.use('/api/upload', upload)

  // auth routes
  app.use('/auth/local', authLocal);
}

module.exports = routes;
