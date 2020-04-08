const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');

const { getUserProfile, postUserProfile } = require('../controllers/profile');

router.route('/').post(protect, postUserProfile);
router.route('/me').get(protect, getUserProfile);

module.exports = router;
