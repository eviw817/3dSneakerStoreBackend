const User = require('../models/User');
const passport = require('../passport/passport');
const jwt = require('jsonwebtoken');

const signup = async (request, response) => {
    let username = request.body.username;
    let password = request.body.password;
    const user = new User({ 
        username: username 
    });
    await user.setPassword(password);
    await user.save().then(result => {
        let token = jwt.sign({
            uid: result._id,
            username: result.username
        }, "secret shit");
        response.json({ 
            "status": 'Signup successful',
            "data": {
                "token": token
            }
        });
    }).catch(error => {
        response.status(404).json({ 
            "status": "Signup failed",
        });
    })
};

const login = (request, response, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return response.status(401).json({
                "status": "Login failed",
                "message": info ? info.message : "Login failed"
            });
        }

        request.login(user, { session: false }, (err) => {
            if (err) {
                return response.status(500).json({
                    "status": "Login failed",
                    "message": err.message
                });
            }

            const token = jwt.sign({
                uid: user._id,
                username: user.username
            }, "secret shit");

            return response.json({
                "status": "Login successful",
                "data": {
                    "user": {
                        "_id": user._id,
                        "username": user.username
                    },
                    "token": token
                }
            });
        });
    })(request, response, next);
};

module.exports = { 
    signup,
    login
};