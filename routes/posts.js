const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');

const { addPost } = require('../controllers/posts');

router.route('/').post(protect, addPost);

module.exports = router;
