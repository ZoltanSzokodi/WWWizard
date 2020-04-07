const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/users');

// @desc    Register a user
// @route   Post /api/v1/users
// @access  Public
router.route('/register').post(registerUser);

module.exports = router;
