const passport = require('passport');
const User = require('../models/User');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// webtoken strategy (JWT)
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "very secret 3dsneaker hash"
}

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.uid})
        .then(result => {
            if (result) {
                return done(null, result);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        })
        .catch(err => {
            return done(err, false);
        })
}));


module.exports = passport;
