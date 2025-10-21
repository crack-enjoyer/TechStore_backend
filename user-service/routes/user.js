const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/me', authenticateToken, getProfile);

module.exports = router;