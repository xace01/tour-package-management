const express = require('express');
const router = express.Router();
const controller = require('../controllers/booking.controller');
const verifyToken = require('../middleware/auth.middleware');
const checkRole = require('../middleware/role.middleware')


// Base path: /booking
router.get('/', verifyToken,controller.getAllBookings);
router.get('/:id', verifyToken,controller.getBookingById);
router.post('/',verifyToken, controller.createBooking);
router.put('/:id', verifyToken,controller.updateBooking);
router.delete('/:id', verifyToken, checkRole('admin'),controller.deleteBooking);

module.exports = router;