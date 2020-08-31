const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

// Register user
router.post('/register', (req, res, next) => {
    let newUser =  new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, message: 'Failed to register user'})
        }
        else {
            res.json({success: true, message: `${newUser.username} is now registered.`})
        }
    })
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) {
            throw err;
        }
        // If user is not returned
        if(!user) {
            return res.json({success: false, message: 'User not found'});
        }
        // If username is present, check password
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign((user.toJSON()), config.secret, {
                    expiresIn: 604800 // 1 week in seconds
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    // Create oun user obj instead so password won't be included
                    user: {
                        id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email
                    }
                });

            }
            else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        })
    })
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({user: req.user});
});


// Export so app.js can use
module.exports = router;