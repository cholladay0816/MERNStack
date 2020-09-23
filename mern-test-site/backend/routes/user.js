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
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));
});
//Register Post
router.route('/register').post((req,res) => {

    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    const username = req.body.username;
    const email = req.body.email;
    const position = req.body.position;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const dob = req.body.dob;
    const sentPass = req.body.password;
    const bio = req.body.bio;

    bcrypt.hash(sentPass, saltRounds, function(err, password) {
        if(err)
        {
            return res.status(400).json('Error: '+err);
        }
        const newUser = new User({firstname, lastname, username, position, email, password, dob, bio});
        newUser.save()
            .then(()=> res.json('User added!'))
            .catch(err=>res.status(400).json('Error: '+err));
    });
});
//Login Post
router.route('/login').post((req,res) => {

    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    const username = req.body.username;
    const sentPass = req.body.password;

    User.findOne({'username' : username})
        .then((targUser) => {

            // Load hash from your password DB.
            bcrypt.compare(sentPass, targUser.password, function(err, result) {
             if(result) {
                res.json('User Verified!');
             }
             else {
                return res.status(400).json('Error: login failed'); //Invalid password
             }
            });
        })
        .catch(err=>res.status(400).json('Error: login failed'));//User does not exist
});

module.exports = router;