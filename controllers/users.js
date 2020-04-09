const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const sendResponseToken = require('../utils/sendResponseToken');
const gravatar = require('gravatar');

// @desc    Register a user
// @route   POST /api/v1/users/register
// @access  Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  let user = await User.findOne({ email });
  // Check if user already exists with the provided email
  if (user) {
    return next(new ErrorResponse(`${email} is already registered`, 400));
  }
  // Retrieve the avatar picture from gravatar.com
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm',
  });
  // Create the user with adding an avatar
  user = await User.create({ ...req.body, avatar });

  sendResponseToken(user, 201, res);
});

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  console.log(req);

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});
