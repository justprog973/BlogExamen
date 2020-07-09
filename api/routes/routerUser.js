const router = require('express').Router();

router.get('/profile', function(req, res){
        return res.status(200).json({ success:{message: 'welcome to profile page :).'} });
});

router.get('/logout', function(req, res){
        req.logOut();
        return res.status(200).json({ success:{message:  'Vous avez été deconecté avec succès.'}});
});

module.exports = router;

