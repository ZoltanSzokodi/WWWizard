const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');

const { getAuthUser, loginUser } = require('../controllers/auth');

router.route('/').get(protect, getAuthUser);
router.route('/login').post(loginUser);

module.exports = router;
