const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');
const User          = require('../models/Users');

const initialize = function (passport){
    const authenticateUser =  function(username, password, done){
        User.checkIfUnique(username, async function(u){
                if(u.length > 0){
                    const match = await bcrypt.compare(password, u[0].password);
                    if(match){
                        const user = {
                            id           : u[0].id,
                            username     : u[0].username,
                            email        : u[0].email,
                            lastname     : u[0].lastname,
                            firstname    : u[0].firstname,
                        }
                        return done(null, user);
                    }else{
                        return done(null, false, {errors : {message: "mot de passe incorrect."}});
                    }     
                }
                return  done(null, false, {errors : {message: "username ou email incorrect"}});
        },'username', true);
    }

    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser(function (user, done){ done(null, user.id) });
    passport.deserializeUser(function (id, done) {User.findBy(id,function (u) { done(null, u[0].id)})});
};

module.exports = initialize;