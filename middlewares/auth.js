const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if there is a token in the headers or in the cookie
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Extract token from cookie if not present in the headers
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  console.log(req.cookies);

  // Make sure the token was sent with the request
  if (!token) {
    return next(
      new ErrorResponse('User is not authorized to access this route', 401)
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});
