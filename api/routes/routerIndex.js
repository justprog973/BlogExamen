const  router = require('express').Router();
const  bcrypt = require('bcrypt'); 
const  User   = require('../models/User');
const  Post   = require('../models/Post');
const  Category = require('../models/Category');
const {usernameregex,emailregex,passwordregex} = require('../utils/regex');
const passport= require('passport');

/**
 * Register user 
 */
router.post('/register', async function (req, res) {
    // create an object with what the has to send
    let fieldUser = {
        username : req.body.username,
        email    : req.body.email,
        password : req.body.password
    };
    //object for contain errors 
    let username  = {};
    let email     = {};
    let password  = {};
    let errors    = {};

    //test all field
    if(!usernameregex.regex.test(fieldUser.username)){
        username = {username: {message: usernameregex.message}};
    }
    if(!emailregex.regex.test(fieldUser.email)){
        email = {email: {message: emailregex.message}};
    }
    if(!passwordregex.regex.test(fieldUser.password)){
        password = {password: {message: passwordregex.message}};
    }
    errors = {...username,...email,...password};
    if(Object.entries(errors).length){
        return res.status(400).json({errors});
    }

    // encrypt password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    fieldUser.password = hashedPassword;
    try{ 
        //Check if it's the only username   
        const queryUsername = User.findOne({ username : fieldUser.username}).exec();
        queryUsername.then((u) =>{
            if(u){ 
                username = {username : {message : `L'username ${fieldUser.username} est déjà utilisé.`}};
            }
            //Check if it's the only email
            const queryEmail = User.findOne({ email : fieldUser.email}).exec();
            queryEmail.then((e) =>{
                    if(e){ 
                        email = {email: { message:`L'email ${fieldUser.email} est déjà utilisé.`}};
                    }
                    errors = {...username,...email};
                    //if there are errors it sends it 
                    if(Object.entries(errors).length > 0){
                        return res.status(400).json({errors});
                    }
                    //if don't errors the user is save
                    new User(fieldUser).save().then((save)=>{
                        return res.status(201).json({success: {message: `Votre compte a bien étè crée.`}})
                    }).catch((e)=> res.status(500).json({errors: {message: e.message}}));;
            });
        });
    }catch(err){
        return res.status(500).json(err.message);
    }
});
/**
 * Get all posts
 */
router.get('/allposts', function (req, res){
    
    try {
        const queryPost = Post.find({}).populate('author','username email').populate('categories').limit(6);
        queryPost.exec(function(err, p){
            if(err){
                return res.status(400).json({errors: {message: err.message}});
            }
            return res.status(200).json(p);
        });

    }catch(e){
        return res.status(500).json({errors: {message: e.message}});
    }
});
/**
 * Get all Categories 
 */
router.get('/allcategories',function(req,res){
    try {
        const queryCateg = Category.find({});
        queryCateg.exec(function(err, c){
            if(err){
                return res.status(400).json({errors: {message: err.message}});
            }
            return res.status(200).json(c);
        });

    }catch(e){
        return res.status(500).json({errors: {message: e.message}});
    }
});
/**
 * Get if user connect
 */
router.get('/auth', function(req, res){
    if(req.user){
        return res.status(200).json({user: req.user});
    }
    return res.status(400).json({user: {message: "Invalid user credentials."}});
});
/**
 * Login user
 */
router.post('/login', function(req, res, next){
    passport.authenticate('local',function(err, user, info){
            if(err) {return res.status(500).json({errors : {message : err}});}
            if(!user) {return res.status(400).json(info);}
            req.logIn(user, function(err) {
                if (err) { return res.status(400).json(err); }
                return res.status(200).json({user});
              });
    })(req, res, next);
});


module.exports = router;