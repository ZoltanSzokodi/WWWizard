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

// @desc    Update a profile experience
// @route   PUT /api/v1/profile/experience/:id
// @access  Private
exports.updateExperience = asyncHandler(async (req, res, next) => {
  const updatedExperience = { ...req.body };

  const profile = await Profile.findOne({ user: req.user });

  // 0 if no experience found with id, 1 if successfully updated
  let count = 0;
  profile.experience.forEach((exp, i) => {
    // Find the exp that needs to be updatad according to it's id
    if (exp._id == req.params.id) {
      count++;
      // Find the matching props and replace the old one with the updated one
      for (let prop in profile.experience[i]) {
        if (updatedExperience.hasOwnProperty(prop)) {
          profile.experience[i][prop] = updatedExperience[prop];
        }
      }
    }
  });

  // if there was no experience found throw error
  if (count === 0) {
    return next(new ErrorResponse('Resource not found', 404));
  }

  await profile.save();

  res.status(201).json({
    success: true,
    profile: profile.id,
    data: profile.experience,
  });
});

// @desc    Delete a profile experience
// @route   DELETE /api/v1/profile/experience/:id
// @access  Private
exports.deleteExperience = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user });

  // Create a filtered copy of the original experience array
  let filteredExperience = profile.experience.filter(
    exp => exp._id != req.params.id
  );

  // If the filtered version has the same length as the original throw error
  if (profile.experience.length === filteredExperience.length) {
    return next(new ErrorResponse('Resource not found', 404));
  }

  profile.experience = filteredExperience;

  await profile.save();

  res.status(201).json({
    success: true,
    profile: profile.id,
    data: profile.experience,
  });
});

// @desc    Add profile education
// @route   PUT /api/v1/profile/education
// @access  Private
exports.addEducation = asyncHandler(async (req, res, next) => {
  const newEducation = { ...req.body };

  const profile = await Profile.findOne({ user: req.user });

  profile.education.unshift(newEducation);

  await profile.save();

  res.status(201).json({
    success: true,
    profile: profile.id,
    data: profile.education,
  });
});

// @desc    Update a profile education
// @route   PUT /api/v1/profile/education/:id
// @access  Private
exports.updateEducation = asyncHandler(async (req, res, next) => {
  const updatedEducation = { ...req.body };

  const profile = await Profile.findOne({ user: req.user });

  // 0 if no education found with id, 1 if successfully updated
  let count = 0;
  profile.education.forEach((edu, i) => {
    // Find the school that needs to be updated according to it's id
    if (edu._id == req.params.id) {
      count++;
      // Find the matching props and replace the old one with the updated one
      for (let prop in profile.education[i]) {
        if (updatedEducation.hasOwnProperty(prop)) {
          profile.education[i][prop] = updatedEducation[prop];
        }
      }
    }
  });

  // if there was no education found throw error
  if (count === 0) {
    return next(new ErrorResponse('Resource not found', 404));
  }

  await profile.save();

  res.status(201).json({
    success: true,
    profile: profile.id,
    data: profile.education,
  });
});

// @desc    Delete a profile education
// @route   DELETE /api/v1/profile/education/:id
// @access  Private
exports.deleteEducation = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user });

  // Create a filtered copy of the original education array
  let filteredEducation = profile.education.filter(
    edu => edu._id != req.params.id
  );

  // If the filtered version has the same length as the original throw error
  if (profile.education.length === filteredEducation.length) {
    return next(new ErrorResponse('Resource not found', 404));
  }

  profile.education = filteredEducation;

  await profile.save();

  res.status(201).json({
    success: true,
    profile: profile.id,
    data: profile.education,
  });
});
