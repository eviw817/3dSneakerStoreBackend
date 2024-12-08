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

const login = async (request, response, next) => {
    try {
        const user = await new Promise((resolve, reject) => {
            passport.authenticate('local', { session: false }, (err, user, info) => {
                if (err || !user) {
                    reject(info ? info.message : "Login failed");
                } else {
                    resolve(user);
                }
            })(request, response, next);
        });

        if (user.username === "admin@admin.com" && request.body.password === "Admin") {
            user.isAdmin = true;
            await user.save();
        }

        const token = jwt.sign({
            uid: user._id,
            username: user.username,
            isAdmin: user.isAdmin || false
        }, "very secret 3dsneaker hash");

        return response.json({
            "status": "Login successful",
            "data": {
                "user": {
                    "_id": user._id,
                    "username": user.username,
                    "isAdmin": user.isAdmin || false
                },
                "token": token
            }
        });
    } catch (error) {
        return response.status(401).json({
            "status": "Login failed",
            "message": error
        });
    }
};

module.exports = { 
    signup,
    login
};