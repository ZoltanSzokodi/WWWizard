const express = require('express');
const router = express.Router();

// @desc
// @route   GET /api/v1/auth
// @access  Public
router.route('/').get(async (req, res, next) => {
 res.send('Hello from the auth route');
});

module.exports = router;
