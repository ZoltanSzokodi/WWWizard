const express = require('express');
const router = express.Router();

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
router.route('/').get(async (req, res, next) => {
 res.send('Hello from the users route');
});

module.exports = router;
