const express = require('express');
const router = express.Router();
const controller = require('../controllers/package.controller');
const verifyToken = require('../middleware/auth.middleware');
const checkRole = require('../middleware/role.middleware');
const multer = require('multer');

// public
router.get('/', controller.getAllPackages);
router.get('/:id', controller.getPackageById);

// admin only
// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Route with file upload middleware
router.post(
  '/',
  verifyToken,
  checkRole('admin'),
  upload.single('image'), // image field in form
  controller.createPackage
);
router.put('/:id', verifyToken, checkRole('admin'), controller.updatePackage);
router.delete('/:id', verifyToken, checkRole('admin'), controller.deletePackage);

module.exports = router;