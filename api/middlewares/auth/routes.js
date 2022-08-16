const { Router } = require('express');
const { loginUserHandler } = require('./services');
const { validateLogin } = require('../../users/joiSchema');

const router = Router();

router.post('/login', validateLogin, loginUserHandler);

module.exports = router;
