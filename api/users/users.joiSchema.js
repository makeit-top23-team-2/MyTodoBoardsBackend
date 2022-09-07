const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .required(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const payload = { email, password };
  const { error } = loginSchema.validate(payload);
  if (error) {
    console.error(error);
    return res.status(400).json({ error, message: 'missing data' });
  }
  next();
  return null;
}

const changePasswordSchema = Joi.object({
  newPassword: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .required(),
});

function changePasswordValidation(req, res, next) {
  const { newPassword } = req.body;
  console.log(
    '🚀 ~ file: users.joiSchema.js ~ line 33 ~ changePasswordValidation ~ password',
    newPassword
  );
  const payload = { newPassword };
  const { error } = changePasswordSchema.validate(payload);

  if (error) {
    console.error(error);
    return res.status(400).json(error);
  }
  next();
  return null;
}

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .required(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .required(),

  name: Joi.string().min(2).max(20).required(),

  lastName: Joi.string().min(2).max(20).required(),

  userName: Joi.string().alphanum().min(3).max(30).required(),
});

function registerLogin(req, res, next) {
  const { email, password, name, lastName, userName } = req.body;
  const payload = { email, password, name, lastName, userName };
  const { error } = registerSchema.validate(payload);

  if (error) {
    console.error(error);
    return res.status(400).json(error);
  }
  next();
  return null;
}

const userUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),

  lastName: Joi.string().min(2).max(20).required(),

  userName: Joi.string().alphanum().min(3).max(30).required(),
});

function userUpdateValidation(req, res, next) {
  const { name, lastName, userName } = req.body;
  const payload = { name, lastName, userName };
  const { error } = userUpdateSchema.validate(payload);
  if (error) {
    console.error(error);
    return res.status(400).json(error);
  }
  next();
  return null;
}

module.exports = {
  validateLogin,
  registerLogin,
  userUpdateValidation,
  changePasswordValidation,
};
