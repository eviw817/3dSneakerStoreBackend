const User = require('../../../models/api/v1/User');
const passport = require('../../../passport/passport');

const signup = async (request, response) => {
    let username = request.body.username;
    let password = request.body.password;
    const user = new User({ 
        username: username 
    });
    await user.setPassword(password);
    await user.save().then(result => {
        response.json({ 
            message: 'Signup successful', 
            user: result 
        });
    }).catch(error => {
        response.status(404).json({ 
            message: 'An error occured', 
            error: error 
        });
    })
};

module.exports = { 
    signup 
};