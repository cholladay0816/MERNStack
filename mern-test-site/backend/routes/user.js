const router = require('express').Router();
let User = require('../models/user.model');

//All Users
router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));
});
//View User Page
router.route('/:username').get((req,res) => {
    User.findOne({'username' : req.params.username})
    .then(users => {
        res.json(users);
    })
    .catch(err => res.status(400).json('Error: '+err));
});
//Register Post
router.route('/register').post((req,res) => {
    //Set up bcrypt for password encryption
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    //Gather data from post
    const username = req.body.username;
    const email = req.body.email;
    const position = req.body.position;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const dob = Date.parse(req.body.dob);
    const sentPass = req.body.password;
    const bio = req.body.bio;
    //Hash the password
    bcrypt.hash(sentPass, saltRounds, function(err, password) {
        if(err)
        {
            return res.status(400).json('Error: '+err);
        }
        //Attempt to create and save a new user
        const newUser = new User({firstname, lastname, username, position, email, password, dob, bio});
        newUser.save()
            .then(()=> {
                req.session.user = newUser;
                res.json('User added!');
        })
            .catch(err=>res.status(400).json('Error: '+err));
    });
});
//Logout
router.route('/logout').all((req,res) => {
    req.session.destroy(function(err) {
        return res.json('Logged out');
      })
});
//Login Post
router.route('/login').post((req,res) => {
    //If already logged in, don't allow it
    if(req.session.user)
    {
        return res.json('Already logged in');
    }
    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    const username = req.body.username;
    const sentPass = req.body.password;

    User.findOne({'username' : username})
        .then((targUser) => {

            //Load hash from target user's DB and compare.
            bcrypt.compare(sentPass, targUser.password, function(err, result) {
             if(result) {
                req.session.user = targUser;
                res.json('User Verified!');
             }
             else {
                return res.status(400).json('Error: login failed'); //Invalid password
             }
            });
        })
        .catch(err=>res.status(400).json('Error: login failed')); //User does not exist
});

module.exports = router;