const User = require('../../../models/api/v1/User');
const passport = require('../../../passport/passport');
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
    const user = await User.authenticate()(request.body.username, request.body.password).then(result => {
        response.json({
            "status": "Login successful",
            "data": {
                "user": result
            }
        });
    }).catch(error => {
        response.status(401).json({
            "status": "Login failed",
            "message": error
        });
    }
    );
}

module.exports = { 
    signup,
    login
};