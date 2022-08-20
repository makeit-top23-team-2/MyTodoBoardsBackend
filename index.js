require('dotenv').config();
const express = require('express');

const configExpress = require('./config/express');
const routesConfig = require('./routes');
const connectDb = require('./config/database');

// eslint-disable-next-line no-extend-native
Object.defineProperty(String.prototype, 'capitalize', {
  value() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

const app = express();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, async () => {
  // Configure express
  configExpress(app);

  // Connect to database
  await connectDb();

  // Configure routes
  routesConfig(app);

  console.log(
    `Server running on port http://localhost:${PORT} in ${NODE_ENV} mode`
  );
});
