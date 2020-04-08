// Reusable response function for sending token for authentication
const sendResponseToken = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwt();

  // Options for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};

module.exports = sendResponseToken;
