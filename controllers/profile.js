const Profile = require('../models/Profile');
const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get my profile
// @route   GET /api/v1/profile/me
// @access  Private
exports.getMyProfile = asyncHandler(async (req, res, next) => {
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

// @desc    Get all profiles
// @route   GET /api/v1/profile
// @access  Public

exports.getAllProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find().populate('user', ['name', 'avatar']);

  res.status(200).json({
    success: true,
    count: profiles.length,
    data: profiles,
  });
});

// @desc    Get profile by user id
// @route   GET /api/v1/profile/user/:id
// @access  Public
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({
    user: req.params.id,
  }).populate('user', ['name', 'avatar']);

  if (!profile) {
    return next(new ErrorResponse('Profile not found', 404));
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

// @desc    Add profile experience
// @route   PUT /api/v1/profile/experience
// @access  Private
exports.addExperience = asyncHandler(async (req, res, next) => {
  const newExperience = { ...req.body };

  const profile = await Profile.findOne({ user: req.user });

  profile.experience.unshift(newExperience);

  await profile.save();

  res.status(201).json({
    success: true,
    profile: profile.id,
    data: profile.experience,
  });
});

// @desc    Remove profile, user & post
// @route   DELETE /api/v1/profile
// @access  Private
exports.deleteProfileAndUser = asyncHandler(async (req, res, next) => {
  // Delete profile
  await Profile.findOneAndDelete({ user: req.user.id });
  // Delete user
  await User.findByIdAndDelete(req.user.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
