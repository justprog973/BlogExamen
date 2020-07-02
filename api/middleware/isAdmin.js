module.exports = function(req, res, next) {
        if(req.user.isAdmin){
            return next();
        }
        return res.status(403).json({errors:{mesage: "Accès refusé."}});
};