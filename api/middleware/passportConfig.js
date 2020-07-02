const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');
const User          = require('../models/User');

const initialize = function (passport){
    const authenticateUser = async function(username, password, done){
        let user = {};
        try{
            const queryUsername = User.findOne({username : username}).exec();
            queryUsername.then(async (u)=>{
                if(!u){
                    const queryEmail = User.findOne({email : username}).exec();
                    queryEmail.then(async (e)=>{
                        if(e){
                            const match = await bcrypt.compareSync(password,e.password);
                            if(match){
                                user.id        = e.id; 
                                user.username  = e.username;
                                user.email     = e.email;
                                user.isAdmin   = e.isAdmin
                                user.urlAvatar = e.urlAvatar;
                                user.fisrtname = e.fisrtname;
                                user.lastname  = e.lastname;
                                user.created_at= e.created_at;
                                return done(null,user,{success: {message : "Vous etes a présent connecté."}});
                            }
                            return done(null,false, {errors: {password: {message: "Votre mot de passe est incorrect."}}});
                        }else{
                            return done(null,false, {errors: {username: {message: "Votre username ou email est incorrect."}}});
                        }
                    });
                }else{
                    const match = await bcrypt.compareSync(password,u.password);
                    if(match){
                        user.id        = u.id; 
                        user.username  = u.username;
                        user.email     = u.email;
                        user.isAdmin   = u.isAdmin
                        user.urlAvatar = u.urlAvatar;
                        user.fisrtname = u.fisrtname;
                        user.lastname  = u.lastname;
                        user.created_at= u.created_at;
                        
                        return done(null,user,{success: {message : "Vous etes a présent connecté."}});
                    }
                    return done(null,false, {errors: {password: {message: "Votre mot de passe est incorrect."}}})   
                }
            });
        }catch(err){
            return res.status(500).json({err});
        }
    }

    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done)=>{ done(null, user.id) });
    passport.deserializeUser((id, done)=>{
        try{
            const query = User.findById(id).select('-password').exec();
            query.then((user)=>{
                return done(null, {id: user.id, isAdmin: user.isAdmin});
            });
        }catch(e){
            return res.status(500).json({errors :{message: e.message}});
        }
    });
};

module.exports = initialize;