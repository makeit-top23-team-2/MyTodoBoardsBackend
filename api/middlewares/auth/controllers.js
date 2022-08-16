require('dotenv').config();
const jwt = require('jsonwebtoken');

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
  const token = await jwt.sign(payload, KEY, { expiresIn: '1h' });
  return token;
}

module.exports = { signToken, verifyToken };
