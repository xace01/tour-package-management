const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth.middleware');
const checkRole = require('../middleware/role.middleware');

// Public route
router.post('/', controller.createUser);

// Admin only
router.get('/', verifyToken, checkRole('admin'), controller.getAllUsers);
router.get('/:id', verifyToken, checkRole('admin'), controller.getUserById);
router.delete('/:id', verifyToken, checkRole('admin'), controller.deleteUser);

// Logged-in user routes
router.get('/me', verifyToken, controller.getMe);
router.put('/:id', verifyToken, controller.updateUser);

module.exports = router;
