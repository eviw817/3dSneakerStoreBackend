const express = require('express');
const router = express.Router();
const authController = require("../../../contollers/api/v1/auth");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', authController.signup);

module.exports = router;
