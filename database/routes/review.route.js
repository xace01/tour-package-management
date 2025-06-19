const express = require('express');
const router = express.Router();
const controller = require('../controllers/review.controller');
const verifyToken = require('../middleware/auth.middleware');


router.get('/', verifyToken, controller.getAllReviews);         // /review
router.get('/:id', verifyToken,controller.getReviewById);      // /review/:id
router.post('/', verifyToken,controller.createReview);         // /review
router.put('/:id', verifyToken,controller.updateReview);       // /review/:id
router.delete('/:id', verifyToken, controller.deleteReview);    // /review/:id

module.exports = router;
