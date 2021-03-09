const {emailRegex} = require("../utils/regex");
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.put('/profile/update/:id?', function (req, res) {
    try {
        let fieldUser = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            email: req.body.email,
            isActive: req.body.isActive
        };
        console.log(fieldUser);
        let user = User.findById(req.params.id ? req.params.id : req.user.id);
        user.exec(async function (err, u) {
            if (err) {
                throw err;
            }
            if (fieldUser.username) {
                u.username = fieldUser.username.toLowerCase();
                if (fieldUser.firstname) {
                    u.firstname = fieldUser.firstname.toLowerCase();
                }
                if (fieldUser.lastname) {
                    u.lastname = fieldUser.lastname.toLowerCase();
                }
                if (fieldUser.password) {
                    const salt = await bcrypt.genSalt();
                    u.password = await bcrypt.hash(fieldUser.password, salt);
                }
            }
            if (fieldUser.email) {
                u.email = fieldUser.email.toLowerCase();
            }
            if(!fieldUser.email && !fieldUser.username) {
                u.isActive = fieldUser.isActive;
            }

            u.updated_at = new Date();
            u.save(function (err, newU) {
                if (err) {
                    return res.status(400).json({errors: {message: err.message}});
                }
                let newUO = {
                    _id: newU._id,
                    username: newU.username,
                    email: newU.email,
                    isAdmin: newU.isAdmin,
                    isActive: newU.isActive,
                    urlAvatar: newU.urlAvatar,
                    firstname: newU.firstname,
                    lastname: newU.lastname,
                    created_at: newU.created_at,
                };
                res.status(200).json(newUO);
            });
        });
    } catch (e) {
        return res.status(500).json({errors: {message: e.message}});
    }
});

router.delete('/delete/:id', function (req, res) {
    const id = req.params.id;
    User.findOneAndDelete({_id: id}).then(function () {
        req.logOut();
        return res.status(200).json({success: {message: 'Votre compte a bien été supprimé.'}});
    }).catch(e => res.status(500).json({errors: {message: e.message}}));
});

router.get('/logout', function (req, res) {
    req.logOut();
    return res.status(200).json({success: {message: 'Vous avez été deconecté avec succès.'}});
});

module.exports = router;

