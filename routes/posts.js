const express = require('express');
const router = express.Router();

// @desc
// @route   GET /api/v1/posts
// @access  Public
router.route('/').get(async (req, res, next) => {
 res.send('Hello from the posts route');
});

module.exports = router;
