const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');

const {
  getMyProfile,
  getUserProfile,
  getAllProfiles,
  postUserProfile,
} = require('../controllers/profile');

router.route('/').get(getAllProfiles);
router.route('/').post(protect, postUserProfile);
router.route('/me').get(protect, getMyProfile);
router.route('/user/:id').get(getUserProfile);

module.exports = router;
