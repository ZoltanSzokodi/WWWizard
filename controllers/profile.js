const Profile = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get my profile
// @route   GET /api/v1/profile/me
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    'user',
    ['name', 'avatar']
  );

  if (!profile) {
    return next(new ErrorResponse(`There is no profile for this user`, 404));
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
});
