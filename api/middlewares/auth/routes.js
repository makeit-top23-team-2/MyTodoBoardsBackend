const { Router } = require('express');
const { loginUserHandler } = require('./services');

const router = Router();

router.post('/login', loginUserHandler);

module.exports = router;