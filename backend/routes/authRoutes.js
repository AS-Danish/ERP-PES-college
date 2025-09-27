const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { login, register, verifyToken, debugToken } = require('../controllers/authController');


// POST /api/login
router.post('/login', login);
router.post('/register', register);

// GET /api/verify-token (protected route)
router.get('/verify-token', authMiddleware, verifyToken);

// GET /api/debug-token (unprotected route for debugging)
router.get('/debug-token', debugToken);

module.exports = router;
