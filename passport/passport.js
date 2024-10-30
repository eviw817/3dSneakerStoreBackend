const passport = require('passport');
const User = require('../models/api/v1/User');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());