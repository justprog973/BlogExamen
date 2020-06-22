const router = require('express').Router();
const user = require('../models/Users');

const register = router.post('/',(req, res)=>{
        let elements = [];
        elements['username'] = req.body.username;
        elements['email']   = req.body.email;
        elements['password'] = req.body.password;
        user.create(elements,()=>{
                res.status(200).json({success : 'Votre compte a été crée avec success'});
        });
});


module.exports = register;