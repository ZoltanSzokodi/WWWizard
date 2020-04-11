const Post = require('../models/Post');
const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../middlewares/errorHandler');

// @desc    Create a post
// @route   POST /api/v1/posts
// @access  Private
exports.addPost = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const newPost = {
    user: req.user.id,
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
  };

  const post = await Post.create(newPost);

  res.status(200).json({
    success: true,
    data: post,
  });
});
