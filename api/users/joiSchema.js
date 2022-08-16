const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
});

function validateLogin(req, res, next) {
  const { email, password } = req.body
  const payload = ({email, password});
  const { error } = loginSchema.validate(payload);
  if (error) {
    return res.status(400).json({ error, message: 'missing data' });
  }
  next();
  return null;
};

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),

  name: Joi.string().min(2).max(20).required(),

  lastName: Joi.string().min(2).max(20).required(),

  userName: Joi.string().alphanum().min(3).max(30).required(),
});

function registerLogin(req, res, next) {
  const { email, password, name, lastName, userName } = req.body
  const payload = ({ email, password, name, lastName, userName });
  const { error } = registerSchema.validate(payload);
  if (error) {
    return res.status(400).json({ error, message: 'missing data' });
  }
  next();
  return null;
};

module.exports = { validateLogin, registerLogin };
