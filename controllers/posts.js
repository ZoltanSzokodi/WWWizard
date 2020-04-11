const Post = require('../models/Post');
const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all posts
// @route   GET /api/v1/posts
// @access  Private
exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().sort({ createdAt: -1 });

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

  if (!post) {
    return next(new ErrorResponse('Post not found', 404));
  }

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    Get my posts
// @route   GET /api/v1/posts/me
// @access  Private
exports.getMyPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });

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

  if (!post) {
    return next(new ErrorResponse('Post not found', 404));
  }

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

// @desc    Like or Unlike a post
// @route   PUT /api/v1/posts/:id/like
// @access  Private
exports.likePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  // Add or Remove user's id from likes array
  // 1) filter the likes for the user id
  const likeCtrl = post.likes.filter(
    like => like.user.toString() === req.user.id
  );
  // 2) check if the post was already liked by the user (Boolean)
  const isLiked = likeCtrl.length > 0;

  // 3) if true remove the user id (unlike) - else add the user id to the likes array (like)
  if (isLiked) {
    post.likes.splice(post.likes.indexOf(likeCtrl[0]), 1);
  } else {
    post.likes.unshift({ user: req.user.id });
  }

  await post.save();

  res.status(200).json({
    success: true,
    count: post.likes.length,
    data: post.likes,
  });
});

// @desc    Comment a post
// @route   PUT /api/v1/posts/:id/comment
// @access  Private
exports.addComment = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const post = await Post.findById(req.params.id);

  const newComment = {
    user: req.user.id,
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
  };

  post.comments.unshift(newComment);

  await post.save();

  res.status(201).json({
    success: true,
    data: post.comments[0],
  });
});
