const crypto = require('crypto');

const { sendMailSendGrid } = require('../../utils/mail');

const {
  findUserByEmail,
  findOneUser,
} = require('../../api/users/users.services');

const { signToken } = require('../auth.services');

async function changePasswordHandler(req, res) {
  const { token } = req.params;
  const { password } = req.body;

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
    user.password = password;

    await user.save();

    const jwtoken = signToken({ email: user.email });

    return res.status(200).json({
      token: jwtoken,
      profile: user.profile,
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function forgotPasswordHandler(req, res) {
  const { email } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hash = crypto.createHash('sha256').update(email).digest('hex');

    user.passwordResetActivationToken = hash;
    user.passwordResetActivationExpires = Date.now() + 3_600_000; // 1 hour

    // Send email to user
    const message = {
      from: '"no-reply" <clon.frello@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Welcome to Trello! Activate your Account Now.', // Subject line
      preheader: 'Activate your Account Now.',
      template_id: 'd-85df415c7f734234b0d54b36cc91be3f', // template id
      dynamic_template_data: {
        name: user.name.capitalize(),
        lastName: user.lastName.capitalize(),
        url: `${process.env.FRONTEND_URL}/reset-password/${hash}`,
      },
    };

    await sendMailSendGrid(message);

    return res
      .status(200)
      .json({ message: 'An email was sent to change the password' });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

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
  changePasswordHandler,
  forgotPasswordHandler,
  veryfyAccountHandler,
  loginUserHandler,
};
