const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  password: Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  .required(),
});

const validateLogin = (req, res, next) => {
  const payload = { email, password } = req.body;
  const { error, value } = loginSchema.validate(payload);
  if (error) {
    return res.status(400).json({ error, message: "missing data" });
  }
  next();
};

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  password: Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  .required(),

  name: Joi.string()
  .min(2)
  .max(20)
  .required(),

  lastName: Joi.string()
  .min(2)
  .max(20)
  .required(),

  userName: Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required()
});

const registerLogin = (req, res, next) => {
  const payload = { email, password, name, lastName, userName } = req.body;
  const { error, value } = registerSchema.validate(payload);
  if (error) {
    return res.status(400).json({ error, message: "missing data" });
  }
  next();
};

module.exports = { validateLogin, registerLogin };
