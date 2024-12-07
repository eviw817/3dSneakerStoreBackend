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

const login = async (request, response) => {
    try {
        const { username, password } = request.body;
        const user = await User.authenticate()(username, password);

        if (!user) {
            return response.status(401).json({
                "status": "Login failed",
                "message": "Invalid username or password"
            });
        }

        const token = jwt.sign({
            uid: user._id,
            username: user.username
        }, "secret shit");

        response.json({
            "status": "Login successful",
            "data": {
                "user": {
                    "_id": user._id,
                    "username": user.username
                },
                "token": token
            }
        });
    } catch (error) {
        response.status(401).json({
            "status": "Login failed",
            "message": error.message
        });
    }
}

module.exports = { 
    signup,
    login
};