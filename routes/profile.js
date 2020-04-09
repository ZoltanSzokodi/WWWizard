const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');

const {
  getMyProfile,
  getUserProfile,
  getAllProfiles,
  postUserProfile,
  addExperience,
  updateExperience,
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
router.route('/experience/:id').put(protect, updateExperience);

module.exports = router;
