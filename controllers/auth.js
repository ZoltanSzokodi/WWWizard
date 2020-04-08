const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const sendResponseToken = require('../utils/sendResponseToken');

// @desc    Get auth user
// @route   Get /api/v1/auth
// @access  Private
exports.getAuthUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Check for required fields
  if (!email || !password) {
    return next(new ErrorResponse('Please enter your email and password', 400));
  }
  // Check for user in DB
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 400));
  }
  // Compare the entered password with the original password
  const isMatch = await user.comparePasswords(password);

  if (!isMatch) {
    return next(new ErrorResponse('invalid credentials', 400));
  }
  // Send jwt
  sendResponseToken(user, 200, res);
});
