const Post = require('../models/Post');
const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all posts
// @route   GET /api/v1/posts
// @access  Public
exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});

// @desc    Get a single post
// @route   GET /api/v1/posts/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    Get my posts
// @route   GET /api/v1/posts/me
// @access  Private
exports.getMyPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});

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

// @desc    Update a post
// @route   PUT /api/v1/posts/:id
// @access  Private
exports.updatePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (post.user != req.user.id) {
    return next(
      new ErrorResponse('User is not authorized to access this route', 401)
    );
  }

  post = await Post.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    Delete a post
// @route   DELETE /api/v1/posts/:id
// @access  Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (req.user.id != post.user) {
    return next(
      new ErrorResponse('User is not authorized to access this route', 401)
    );
  }

  await post.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
