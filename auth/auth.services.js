const jwt = require('jsonwebtoken');

const { findUserByEmail } = require('../api/users/users.services');

require('dotenv').config();

const { KEY } = process.env;

async function verifyToken(token) {
  try {
    const payload = await jwt.verify(token, KEY);
    return payload;
  } catch (e) {
    return null;
  }
}

async function signToken(payload) {
  const token = await jwt.sign(payload, KEY, { expiresIn: '3h' });
  return token;
}
async function isAuthenticated(req, res, next) {
  const auth = req.headers ? req.headers.authorization : null;

  if (!auth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = auth.split(' ')[1];
  const decoded = await verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'unAuthorized' });
  }  
  const { email } = decoded;
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  req.user = user;

  console.log(
    '🚀 ~ file: auth.services.js ~ line 49 ~ isAuthenticated ~ user',
    user
  );
  next();
  return null;
}

module.exports = {
  isAuthenticated,
  signToken,
  verifyToken,
};
