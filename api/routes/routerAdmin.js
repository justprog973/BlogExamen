const {categoryRegex}   = require('../utils/regex');
const router            = require('express').Router();
const Category          = require('../models/Category');
const Post              = require('../models/Post');
const User              = require('../models/User');

router.post('/category/add', function (req, res) {
    const fieldCategory = {name: req.body.name.toLowerCase()};
    try {
        if(categoryRegex.regex.test(fieldCategory.name)){
            new Category(fieldCategory).save().then(c => {
                return res.status(201).json(c);
            }).catch(e => res.status(500).json({errors: {message: e.message}}));
        }else{
            res.status(400).json({errors: {message: categoryRegex.message}});
        }
    } catch (e) {
        return res.status(500).json({errors: {message: e.message}});
    }
});

router.put('/category/update/:id', function (req, res) {
    try{
        const id        = req.params.id;
        const category  = Category.findById(id);
        category.exec(function (err, c) {
                c.name  = req.body.name;
                c.save(function (err, newCateg) {
                        if(err){
                            return res.status(400).json({errors : {message: err.message}});
                        }
                        return res.status(200).json(newCateg);
                });
        });
    }catch(e){
        return res.status(500).json({errros: {message: e.message}});
    }
});

router.delete('/category/delete/:id', function (req, res) {
    try {
        const id = req.params.id;
       Post.find({categories: req.params.id}).exec(function (err, p) {
           if(err){
               throw err;
           }
            if(p.length === 0){
                Category.findOneAndDelete({_id: id}).then(function () {
                    return res
                            .status(200)
                            .json({success: {message: 'La catégorie a bien été supprimé.'}});
                }).catch(e => res
                                .status(500)
                                .json({errors: {message: e.message}}));
            }else{
                return res.status(400).json({errors: {message: 'Un ou plusieurs postes sont liée a cette catégories !'}});
            }
       });
    } catch (e) {
        return res.status(500).json({errors: {message: e.message}});
    }
});

router.get('/allusers', function (req, res){
    try{
        const user = User.find({}).sort({created_at: -1}).select('-password');
        user.exec(function (err, u) {
            if(err){
                throw err;
            }
            return res.status(200).json(u);
        })
    }catch (e) {
        return res.status(500).json({errors: {message: e.message}})
    }
});

router.get('/oneuser/:id', function (req, res){
    try{
        const user = User.findOne({id : req.params.id}).select('-password');
        user.exec(function (err, u) {
            if(err){
                throw err;
            }
            return res.status(200).json(u);
        })
    }catch (e) {
        return res.status(500).json({errors: {message: e.message}});
    }
});

module.exports = router;