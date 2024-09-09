const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to register a new user
router.post('/register', authController.registerUser);

// Route to log in a user and generate a JWT token
router.post('/login', authController.loginUser);

// Route to verify a JWT token
router.get('/verify', authController.verifyToken);

module.exports = router;
