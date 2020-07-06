module.exports = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({errors : {message : "Veillez vous connecter."}});
}