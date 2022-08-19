const { Router } = require('express');

const {
  loginUserHandler,
  // changePasswordHandler,
  // forgotPasswordHandler,
  veryfyAccountHandler,
} = require('./local.controller');

const { validateLogin } = require('../../api/users/users.joiSchema');

const router = Router();

router.post('/login', validateLogin, loginUserHandler);
// router.post('/change-password', changePasswordHandler);
// router.post('/forgot-password', forgotPasswordHandler);
router.get('/ActivateAccount/:token', veryfyAccountHandler);

module.exports = router;
