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

router.get('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/password', async function(req, res, next) {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    console.log(id);
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
