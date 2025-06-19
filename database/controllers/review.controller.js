const db = require('../connection');
const Review = db.review;

const getAllReviews = async (req, res) => {
  const { packageId } = req.query;

  const filter = {};
  if (packageId) {
    filter.packageId = packageId;
  }

  const reviews = await Review.findAll({ where: filter });
  res.status(200).json({ message: 'Reviews fetched', data: reviews });
};

const getReviewById = async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.status(200).json({ message: 'Review found', data: review });
};

const createReview = async (req, res) => {
  const { userId, packageId, rating, comment } = req.body;

  // Basic validation
  if (!userId || !packageId || !rating || !comment) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  const newReview = await Review.create({
    userId,
    packageId,
    rating,
    comment
  });

  res.status(201).json({ message: 'Review created', data: newReview });
};

const updateReview = async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });

  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({ message: 'Rating and comment are required' });
  }

  const updated = await review.update({ rating, comment });
  res.status(200).json({ message: 'Review updated', data: updated });
};

const deleteReview = async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });

  await review.destroy();
  res.status(200).json({ message: 'Review deleted' });
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};
