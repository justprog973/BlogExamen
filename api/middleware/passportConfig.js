const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');
const User          = require('../models/User');

const initialize = function (passport){
    const authenticateUser = async function(username, password, done){
        let user = {};
        try{
            const queryUsernameOrEmail = User.findOne({$or: [{username : username}, {email: username}]}).exec();
            queryUsernameOrEmail.then(async (u)=>{
                if(u){
                    const match = await bcrypt.compareSync(password,u.password);
                    if(match){
                                user._id        = u.id;
                                user.username  = u.username;
                                user.email     = u.email;
                                user.isAdmin   = u.isAdmin;
                                user.urlAvatar = u.urlAvatar;
                                user.fisrtname = u.fisrtname;
                                user.lastname  = u.lastname;
                                user.created_at= u.created_at;
                                return done(null,user,{success: {message : "Vous etes a présent connecté."}});
                            }
                            return done(null,false, {errors: {password: {message: "Votre mot de passe est incorrect."}}});
                        }else{
                            return done(null,false, {errors: {username: {message: "Votre username ou email est incorrect."}}});
                        }
            });
        }catch(err){
            return done(null,false,{err});
        }
    }

    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done)=>{ done(null, user._id) });
    passport.deserializeUser((id, done)=>{
        try{
            const query = User.findById(id).select('-password').exec();
            query.then((user)=>{
                return done(null, user);
            });
        }catch(e){
            return done(null,false,{err});
        }
    });
};

module.exports = initialize;