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
  likePost,
  addComment,
  deleteComment,
} = require('../controllers/posts');

router.route('/').get(protect, getAllPosts);
router.route('/').post(protect, addPost);

router.route('/me').get(protect, getMyPosts);

router
  .route('/:id')
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.route('/:id/like').put(protect, likePost);

router.route('/:id/comment').put(protect, addComment);

router.route('/:post_id/comment/:comment_id').delete(protect, deleteComment);

module.exports = router;
