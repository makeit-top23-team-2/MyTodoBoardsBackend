const Joi = require('joi');

const userSchema = Joi.object({
  userName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

  password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),

  email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),

  name: Joi.string()
    .min(2)
    .max(20)
    .required(),

  lastName: Joi.string()
    .min(2)
    .max(20)
    .required(),
})
.with('email', 'password')// login
//.with('userName','password','email','name','lastName'); //at create

function verifyLogin(req, res, next){

  console.log(userSchema.validate(req.body))
  next();


}

module.exports = {verifyLogin};
