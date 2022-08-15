const { Router } = require('express');
const { loginUserHandler } = require('./services');
const { verifyLogin } = require('../../users/joiSchema');

const router = Router();

router.post('/login', verifyLogin, loginUserHandler);

module.exports = router;