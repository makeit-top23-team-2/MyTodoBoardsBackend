const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const validateLogin = (req, res, next) => {
  const payload = { email, password } = req.body;
  const { error, value } = loginSchema.validate(payload);
  if (error) {
    return res.status(400).json({ error, message: "missing data" });
  }
  next();
};

module.exports = { validateLogin };
