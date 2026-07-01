const express = require('express');
const jwt     = require('jsonwebtoken');
const router  = express.Router();
const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET } = require('../middleware/auth');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
    return res.json({ success: true, token, username });
  }
  return res.status(401).json({ success: false, message: 'Invalid username or password' });
});

module.exports = router;
