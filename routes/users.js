const express = require('express');
const router = express.Router();
const authController = require("../contollers/auth");
const User = require('../models/User');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
