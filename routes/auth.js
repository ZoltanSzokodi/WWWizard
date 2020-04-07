const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');

const { getAuthUser } = require('../controllers/auth');

router.route('/').get(protect, getAuthUser);

module.exports = router;
