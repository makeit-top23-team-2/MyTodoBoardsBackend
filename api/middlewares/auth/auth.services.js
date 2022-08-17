const { findUserByEmail } = require('../../users/users.services');
const { verifyToken, signToken } = require('./auth.controllers');

async function loginUserHandler(req, res) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password does not match' });
    }

    const token = await signToken({ email: user.email });

    return res.json({ token, profile: user.profile });
  } catch (e) {
    return res.status(500).json(e);
  }
}

async function isAuthenticated(req, res, next) {
  // verificas que llega el token
  const auth = req.headers?.token;

  if (!auth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // tomas el token
  const token = auth;

  // validar el token
  const decoded = await verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'unAuthorized' });
  }

  // add user to request
  const { email } = decoded;
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  req.user = user;

  next();
  return null;
}

module.exports = { loginUserHandler, isAuthenticated };
