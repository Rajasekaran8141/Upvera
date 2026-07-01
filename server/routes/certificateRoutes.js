const express = require('express');
const router  = express.Router();
const {
  generate, verify, download, updateStatus,
} = require('../controllers/certificateController');
const { verifyToken } = require('../middleware/auth');

// Public
router.get('/verify/:certNumber', verify);

// Protected (admin)
router.post('/generate/:candidateId', verifyToken, generate);
router.get('/download/:certNumber',   verifyToken, download);
router.patch('/status/:certId',       verifyToken, updateStatus);

module.exports = router;
