const { Router } = require('express');
const multer = require('multer');

const { uploadProfile, uploadBackgroundBoard, uploadMultiplefiles } = require('./upload.controller');

const router = Router();
const upload = multer({ dest: './temp' });

router.post('/profile', upload.single('file'), uploadProfile)
router.post('/background/board', upload.single('file'), uploadBackgroundBoard)
router.post('/files/cards', upload.array('files'), uploadMultiplefiles)



module.exports = router;
