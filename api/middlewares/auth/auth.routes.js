const { Router } = require('express');
const { loginUserHandler } = require('./auth.services');
const { validateLogin } = require('../../users/users.joiSchema');

const router = Router();

router.post('/login', validateLogin, loginUserHandler);

module.exports = router;
