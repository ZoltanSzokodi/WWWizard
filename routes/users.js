const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { registerUser, getAllUsers } = require('../controllers/users');

router.route('/register').post(registerUser);

router.route('/').get(getAllUsers);

module.exports = router;
