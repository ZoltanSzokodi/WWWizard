const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const sendResponseToken = require('../utils/sendResponseToken');
const gravatar = require('gravatar');

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  let user = await User.findOne({ email });

  // Check if user already exists with the provided email
  if (user) {
    return next(new ErrorResponse(`${email} is already registered`, 400));
  }

  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm',
  });

  user = await User.create({ ...req.body, avatar });

  sendResponseToken(user, 201, res);
});
