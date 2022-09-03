const { Router } = require('express');
const multer = require('multer');
const { isAuthenticated } = require('../../auth/auth.services');

const { uploadProfile, uploadBackgroundBoard, uploadBackgroundCard } = require('./upload.controller');

const router = Router();
const upload = multer({ dest: './temp' });

router.post('/profile',  isAuthenticated,  upload.single('file'), uploadProfile)
router.post('/background/board',  isAuthenticated, upload.single('file'), uploadBackgroundBoard)
router.post('/background/card',  isAuthenticated, upload.single('file'), uploadBackgroundCard)



module.exports = router;
