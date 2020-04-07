const express = require('express');
const router = express.Router();

// @desc
// @route   GET /api/v1/profile
// @access  Public
router.route('/').get(async (req, res, next) => {
 res.send('Hello from the profile route');
});

module.exports = router;
