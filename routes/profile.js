const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');

const { getUserProfile } = require('../controllers/profile');

router.route('/me').get(protect, getUserProfile);

module.exports = router;
