const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post');
const Category = require('../models/Category');
const View = require('../models/View');
const {usernameRegex, emailRegex, passwordRegex} = require('../utils/regex');
const passport = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const {htmlTemplateEmail} = require('../utils/functions');

/**
 * Register user
 */
router.post('/register', async function (req, res, next) {
    // create an object with what the has to send
    let fieldUser = {
        username: req.body.username.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: req.body.password.toLowerCase(),
    };
    //object for contain errors 
    let username = {};
    let email = {};
    let password = {};
    let errors = {};

    //test all field
    if (!usernameRegex.regex.test(fieldUser.username)) {
        username = {username: {message: usernameRegex.message}};
    }
    if (!emailRegex.regex.test(fieldUser.email)) {
        email = {email: {message: emailRegex.message}};
    }
    if (!passwordRegex.regex.test(fieldUser.password)) {
        password = {password: {message: passwordRegex.message}};
    }
    errors = {...username, ...email, ...password};
    if (Object.entries(errors).length) {
        return res.status(400).json({errors});
    }

    // encrypt password
    const salt = await bcrypt.genSalt();
    fieldUser.password = await bcrypt.hash(req.body.password, salt);
    try {
        //Check if it's the only username   
        const queryUsername = User.findOne({username: fieldUser.username});
        queryUsername.exec((err,u) => {
            if (u) {
                username = {username: {message: `L'username ${fieldUser.username} est déjà utilisé.`}};
            }
            //Check if it's the only email
            const queryEmail = User.findOne({email: fieldUser.email});
            queryEmail.exec((err, e) => {
                if (err) {
                    throw err;
                }
                if (e) {
                    email = {email: {message: `L'email ${fieldUser.email} est déjà utilisé.`}};
                }
                errors = {...username, ...email};
                //if there are errors it sends it
                if (Object.entries(errors).length > 0) {
                    return res.status(400).json({errors});
                }
                //if don't errors the user is save
                new User(fieldUser).save((err, newU) => {
                    if(err){
                        throw err;
                    }
                    passport.authenticate('local', function (err, user, info) {
                        if (err) {
                            return res.status(500).json({errors: {message: err}});
                        }
                        if (!user) {
                            return res.status(400).json(info);
                        }
                        req.logIn(user, function (err) {
                            if (err) {
                                return res.status(400).json(err);
                            }
                            return res.status(200).json(user);
                        });
                    })(req, res, next);
                })
            });
        });
    } catch (err) {
        return res.status(500).json({errors: {message: err.message}});
    }
});
/**
 * Get all posts
 */
router.get('/allposts/:id?', function (req, res) {

    try {
        let queryPost;
        if (req.params.id) {
            queryPost = Post.find({
                categories: req.params.id,
                suggested: true,
                published: true
            }).sort({created_at: -1}).populate('author', {username: 1, email: 1}).populate('categories');
        } else {
            queryPost = Post.find({
                suggested: true,
                published: true
            }).sort({created_at: -1}).populate('author', {username: 1, email: 1}).populate('categories');
        }
        queryPost.exec(function (err, p) {
            if (err) {
                throw err;
            }
            return res.status(200).json(p);
        });

    } catch (err) {
        return res.status(500).json({errors: {message: err.message}});
    }
});
/**
 * Get all Categories
 */
router.get('/allcategories', function (req, res) {
    try {
        const queryCateg = Category.find({});
        queryCateg.exec(function (err, c) {
            if (err) {
                return res.status(400).json({errors: {message: err.message}});
            }
            return res.status(200).json(c);
        });

    } catch (err) {
        return res.status(500).json({errors: {message: err.message}});
    }
});
/**
 * Get if user connect
 */
router.get('/auth', function (req, res) {
    if (req.user) {
        return res.status(200).json(req.user);
    }
    return res.status(400).json({errors: {message: "Missing credential user."}});
});

router.get('/singlepost/:id', function (req, res) {
    try {
        const visitor = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        const post = Post.find({
            _id: req.params.id,
            suggested: true
        }).populate('author', '_id username email').populate('categories');
        post.exec(function (err, p) {
            if (err) {
                return res.status(400).json({errors: {message: err.message}});
            }
            if (p.length !== 0) {
                const view = View.findOne({$and: [{visitor: req.user ? req.user.id : visitor.split(':').pop()}, {post: req.params.id}]});
                view.exec(function (err, v) {
                    if (err) {
                        throw err;
                    }
                    if (!v) {
                        new View({
                            visitor: req.user ? req.user.id : visitor.split(':').pop(),
                            post: req.params.id
                        }).save();
                    }
                });
                return res.status(200).json(p[0]);
            }
            return res.status(404).json({errors: {message: 'Ce poste est inexistant !'}})
        });
    } catch (err) {
        return res.status(500).json({errors: {message: err.message}});
    }
});

router.get('/view', function (req, res) {
    try {
        const view = View.find({});
        view.exec(function (err, v) {
            if (err) {
                throw err;
            }
            return res.status(200).json(v);
        });
    } catch (err) {
        return res.status(500).json({errors: {message: err.message}});
    }
});


/**
 * Login user
 */
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(500).json({errors: {message: err}});
        }
        if (!user) {
            return res.status(401).json(info);
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(400).json(err);
            }
            return res.status(200).json(user);
        });
    })(req, res, next);
});


router.post('/reset', async function (req, res) {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 1025,
        auth: {
            user: 'project.1',
            pass: 'secret.1'
        }
    });

    crypto.randomBytes(32, (err, buf) => {

        if (err) {
            throw err;
        }
        const token = buf.toString("hex");
        User.findOne({email: req.body.email})
            .then(u => {
                if (!u) {
                    return res.status(422).json({errors: {message: "Cette adresse mail n'existe pas."}});
                }
                u.resetToken = token;
                u.expireToken = Date.now() + 1200000;
                u.save(function (err, newU) {
                    if(err){
                        throw err;
                    }
                    transporter.sendMail({
                        to: u.email,
                        from: "no-replay@story-blog.com",
                        subject: "password reset",
                        html: htmlTemplateEmail(newU,token)
                    });
                    return res.status(200).json({success: {messages: 'Un mail a été envoyer a votre adresse mail.'}});
                });
            });
    });
});

router.get('/token/:id', function (req, res) {
        try{
            const  user = User.findOne({$and:[{expireToken:{$gt : new Date()}},{resetToken: req.params.id}]});
            user.exec(function (err, u) {
                    if(err){
                        throw err;
                    }
                    if(u){
                        return res.status(200).json(true);
                    }else{
                        return res.status(200).json(false);
                    }
            })
        }catch (err) {
            return res.status(500).json({errors: {message: err.message}});
        }
});

router.post('/reset/:id',function (req,res) {

    console.log(req.params.id);
    const  user = User.findOne({$and:[{expireToken:{$gt : new Date()}},{resetToken: req.params.id}]});
    user.exec( async function (err,u) {
        if(err){
            throw err;
        }
        console.log(u);
        if(u){
            u.resetToken  = '';
            u.expireToken = '';
            const salt = await bcrypt.genSalt();
            u.password = await bcrypt.hash(req.body.password, salt);
            u.save(function (err, u) {
                if(err) {
                    throw err;
                }
                return res.status(200).json({sucess: {message:  'Votre mot de passe a été modifié avec sucess.'}});
            });
        }else{
            return res.status(400).json({errors: {message:  'Ce lien a expirer.'}});
        }
    });

});

module.exports = router;