const { findOneUser } = require('../../../users/users.services');
const { signToken } = require('../auth.controllers');

// async function changePasswordHandler(req, res) {}

// async function forgotPasswordHandler(req, res) {}

async function veryfyAccountHandler(req, res) {
  const { token } = req.params;

  try {
    const user = await findOneUser({ passwordResetToken: token });

    if (!user) {
      return res.status(404).json({ message: 'Invalid token' });
    }

    if (Date.now() > user.passwordResetExpires) {
      return res.status(404).json({ message: 'Token expired' });
    }

    user.passwordResetToken = null;
    user.passwordResetExpires = null;
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
};
