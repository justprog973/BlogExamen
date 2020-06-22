const router = require('express').Router();
const user = require('../models/Users');

const signUp = router.post('/signup',(req, res)=>{
        let elements = [];
        elements['username'] = req.body.username;
        elements['email']   = req.body.email;
        elements['password'] = req.body.password;
        elements['confirm_password'] = req.body.confirm_password;
        
        user.checkUser(elements['username'],(u)=>{
                if(u.length > 0){
                        console.log(u);
                        res.status(200).json({ username : `username ${u[0].username} déjà existant.`});
                }else{
                       user.checkUser(elements['email'],(u)=>{
                               if(u.length > 0){
                                       res.status(200).json({ email : `email ${u[0].email} déjà existant.`});
                               }else{
                                        user.create(elements,()=>{
                                                res.status(201).json({success : 'Votre compte a été crée avec success'});
                                        });
                               }
                       },'email');
                }
        });
});

const signIn = router.post('/signin',(req, res) => {

});


module.exports = {signIn, signUp};