const {
  findUserByEmail,
  findOneUser,
} = require('../../api/users/users.services');

const { signToken } = require('../auth.services');

// async function changePasswordHandler(req, res) {}

// async function forgotPasswordHandler(req, res) {}

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

async function veryfyAccountHandler(req, res) {
  const { token } = req.params;

  try {
    const user = await findOneUser({ passwordResetActivationToken: token });

    if (!user) {
      return res.status(404).json({ message: 'Invalid token' });
    }

    if (Date.now() > user.passwordResetActivationExpires) {
      return res.status(404).json({ message: 'Token expired' });
    }

    user.passwordResetActivationToken = null;
    user.passwordResetActivationExpires = null;
    user.isActive = true;

    await user.save();

    const jwtoken = signToken({ email: user.email });

    return res.status(200).json({
      token: jwtoken,
      profile: user.profile,
      message: 'Account activated',
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  // loginUserHandler,
  // changePasswordHandler,
  // forgotPasswordHandler,
  veryfyAccountHandler,
  loginUserHandler,
};
