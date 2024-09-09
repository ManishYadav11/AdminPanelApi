const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware'); // Middleware to authenticate JWT
const ensureAdmin = require('../middleware/ensureAdmin'); // Middleware to check if the user is admin


// User routes
router.post('/signup', userController.createUser); 

// Protect all user routes with authentication
router.use(authenticateToken);
router.get('/users', ensureAdmin, userController.getUsers); 
router.get('/users/:id', userController.getUserById); 
router.put('/users/:id', userController.updateUser); 
router.delete('/users/:id', ensureAdmin, userController.deleteUser); 
router.post('/users/:id/restore', ensureAdmin, userController.restoreUser); 

module.exports = router;
