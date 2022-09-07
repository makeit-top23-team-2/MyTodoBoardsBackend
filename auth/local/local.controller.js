const crypto = require('crypto');

const { sendMailSendGrid } = require('../../utils/mail');

const {
  findUserByEmail,
  findOneUser,
} = require('../../api/users/users.services');

const { signToken } = require('../auth.services');

async function changePasswordHandler(req, res) {
  const { token } = req.params;

  const { newPassword } = req.body;

  try {
    const user = await findOneUser({ passwordResetActivationToken: token });
    console.log('User found', user);
    if (!user) {
      console.log('Invalid token');
      return res.status(404).json({ message: 'Invalid token' });
    }

    if (Date.now() > user.passwordResetActivationExpires) {
      console.log('Token expired');
      return res.status(404).json({ message: 'Token expired' });
    }

    user.passwordResetActivationToken = null;
    user.passwordResetActivationExpires = null;
    user.password = newPassword;

    await user.save();

    const jwtoken = await signToken({ email: user.email });
    console.log('Password has been reset successfully');
    return res.status(200).json({
      token: jwtoken,
      profile: user.profile,
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function resetPasswordHandler(req, res) {
  const { email } = req.user;
  console.log(
    '🚀 ~ file: local.controller.js ~ line 51 ~ resetPasswordHandler ~ email',
    email
  );

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    const hash = crypto.createHash('sha256').update(email).digest('hex');

    user.passwordResetActivationToken = hash;

    user.passwordResetActivationExpires = Date.now() + 3_600_000; // 1 hour

    await user.save();

    return res.status(200).json({ hash });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function forgotPasswordHandler(req, res) {
  const { email } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ status: 404, message: 'User not found' });
    }
    const hash = crypto.createHash('sha256').update(email).digest('hex');

    user.passwordResetActivationToken = hash;

    user.passwordResetActivationExpires = Date.now() + 3_600_000; // 1 hour

    await user.save();

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
    console.log('An email was sent to change the password');
    return res.status(200).json({
      status: 200,
      message: 'An email was sent to change the password',
    });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ status: 500, error });
  }
}

async function loginUserHandler(req, res) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      console.log('User not found');
      return res
        .status(404)
        .json({ status: 404, message: 'Invalid Credentials' });
    }

    if (user.isActive === false) {
      console.log('The account has not been activated');
      return res
        .status(403)
        .json({ message: 'The account has not been activated!' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      console.log('Incorrect password');
      return res
        .status(401)
        .json({ status: 401, message: 'Invalid Credentials' });
    }
    const jwtoken = await signToken({ email: user.email });
    console.log('Successful login', user);
    return res.json({
      jwtoken,
      profile: user.profile,
      message: 'Welcome back!',
    });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ status: 401, error });
  }
}

async function veryfyAccountHandler(req, res) {
  const { token } = req.params;

  try {
    const user = await findOneUser({ passwordResetActivationToken: token });

    if (!user) {
      console.log('Invalid token');
      return res.status(404).json({ message: 'Invalid token' });
    }

    if (Date.now() > user.passwordResetActivationExpires) {
      console.log('Token expired');
      return res.status(404).json({ message: 'Token expired' });
    }

    user.passwordResetActivationToken = null;
    user.passwordResetActivationExpires = null;
    user.isActive = true;

    await user.save();

    const jwtoken = await signToken({ email: user.email });
    console.log('Account activated', user);
    return res.status(200).json({
      jwtoken,
      profile: user.profile,
      message: 'Account activated',
    });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

module.exports = {
  changePasswordHandler,
  forgotPasswordHandler,
  veryfyAccountHandler,
  loginUserHandler,
  resetPasswordHandler,
};
