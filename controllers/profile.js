const Profile = require('../models/Profile');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get my profile
// @route   GET /api/v1/profile/me
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return next(new ErrorResponse(`There is no profile for this user`, 404));
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @desc    Create or Update profile
// @route   POST /api/v1/profile
// @access  Private
exports.postUserProfile = asyncHandler(async (req, res) => {
  const {
    company,
    location,
    website,
    bio,
    skills,
    status,
    githubusername,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }

  // Build social object and add to profileFields
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  // Check if user profile already exists
  let profile = await Profile.findOne({ user: req.user.id });

  // If user profile exists, update
  if (profile) {
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, runValidators: true }
    );
  }

  // If user profile does not exist, create
  if (!profile) {
    profile = await Profile.create(profileFields);
  }

  res.status(201).json({
    success: true,
    data: profile,
  });
});
