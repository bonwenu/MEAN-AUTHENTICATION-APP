const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

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
            res.json({success: false, msg: 'Failed to register user'})
        }
        else {
            res.json({success: true, msg: `${newUser.username} is now registered.`})
        }
    })
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    res.send("Register page")
});

// Profile
router.get('/profile', (req, res) => {
    res.send("Register page")
});


// Export so app.js can use
module.exports = router;