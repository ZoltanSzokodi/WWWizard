const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');

const {
  getAllPosts,
  getPost,
  getMyPosts,
  addPost,
  updatePost,
  deletePost,
} = require('../controllers/posts');

router.route('/').get(getAllPosts);
router.route('/').post(protect, addPost);

router.route('/me').get(protect, getMyPosts);

router
  .route('/:id')
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
