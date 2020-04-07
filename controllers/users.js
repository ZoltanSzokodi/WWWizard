const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});
