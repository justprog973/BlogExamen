const  router = require('express').Router();
const  bcrypt = require('bcrypt'); 
const  User   = require('../models/Users');
const passport= require('passport');

/**
 * Router to signup an user 
 */
router.post('/register', async function (req, res) {
    
    // encrypt password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // create an object with what the has to send
    const user = {
        username : req.body.username,
        email    : req.body.email,
        password : hashedPassword
    };
    //check if username is unique
    User.checkIfUnique(user.username, function (u) {
        let username  = {};
        let email     = {};
        let errors    = {};

        if (u.length > 0) {
            username = {username: `username ${u[0].username} déjà existant.`};
            errors   = {errors : {...username}};
        }
        // check if email is unique
        User.checkIfUnique(user.email, function (e) {
                if (e.length > 0) {
                    email = {email: `email ${e[0].email} déjà existant.`};
                    errors = {errors : {...username,...email}};
                } 
                if(Object.entries(errors).length > 0){
                    return res.status(400).json(errors);
                }else{
                    //create user
                    User.create(user,function () {
                        return res.status(201).json({success : { message : 'Votre compte a été crée avec success'}});
                    });
                }
            },'email');
        });
});

/**
 * Route to identity user
 */
router.post('/login', function(req, res, next){
    passport.authenticate('local',function(err, user, info){
            if(err) {return res.status(500).json({errors : {message : err}});}
            if(!user) {return res.status(403).json(info);}
            req.logIn(user, function(err) {
                if (err) { return res.status(403).json(err); }
                return res.status(200).json({user});
              });
    })(req, res, next);
});


module.exports = router;