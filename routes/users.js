const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');

const {
  registerUser,
  loginUser,
  getAllUsers,
} = require('../controllers/users');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/').get(getAllUsers);

module.exports = router;
