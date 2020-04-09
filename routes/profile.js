const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');

const {
  getMyProfile,
  getUserProfile,
  getAllProfiles,
  postUserProfile,
  addExperience,
  deleteProfileAndUser,
} = require('../controllers/profile');

router
  .route('/')
  .get(getAllProfiles)
  .post(protect, postUserProfile)
  .delete(protect, deleteProfileAndUser);
router.route('/me').get(protect, getMyProfile);
router.route('/user/:id').get(getUserProfile);
router.route('/experience').put(protect, addExperience);

module.exports = router;
