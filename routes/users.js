const express = require('express');
const router = express.Router();

const { registerUser, getAllUsers } = require('../controllers/users');

router.route('/').get(getAllUsers);
router.route('/register').post(registerUser);

module.exports = router;
