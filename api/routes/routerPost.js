const router = require('express').Router();
const Post = require('../models/Post');
const path = require('path');
const fs = require('fs');
const jimp = require('jimp');

const dirPath = path.join(__dirname, `../../front/public/uploads/posts`);

router.post('/create', function (req, res, next) {

    // create an object with what the has to send
    let fieldPost = {
        title: req.body.title,
        categories: req.body.categories,
        content: req.body.content,
        author: req.user.id,
        suggested: req.body.suggested,
    };
    // check if files exist
    if (req.files !== null) {

        const file = req.files.attachment;
        const extension = file.mimetype.split('/')[1];
        const nameFile = `${Date.now() + Math.random()}_post.${extension}`;
        const fullPath = `${dirPath}/${nameFile}`;
        try {
            fieldPost.attachment = nameFile;
            if (!Array.isArray(fieldPost.categories)) {
                fieldPost.categories = fieldPost.categories.split(",");
            }
            // create and save new post
            new Post(fieldPost).save().then((save) => {
                //import file in the directory
                file.mv(`${dirPath}/${save.attachment}`, function (err) {
                    if (err) throw err;
                    next();
                    // and resize file
                    jimp.read(fullPath, (err, file) => {
                        if (err) throw err;
                        file
                            .resize(jimp.AUTO, 250)
                            .quality(100)
                            .write(`${dirPath}/thumb_${nameFile}`);
                    });
                });
                return res.status(201).json(save);
            }).catch(e => {
                return res.status(500).json({
                    errors: {message: e.message}
                });
            });
        } catch (e) {
            return res.status(500).json({errors: {message: e.message}});
        }
    }

});

router.delete('/delete/:id',function (req, res) {
    try{
        Post.findOneAndRemove({_id: req.params.id}).then(function (p) {
            fs.unlinkSync(`${dirPath}/${p.attachment}`,function(err) {
                if(err){
                    return res.status(500).json({errors: {message: err.message}})
                }
            });
            fs.unlinkSync(`${dirPath}/thumb_${p.attachment}`,function(err) {
                if(err){
                    return res.status(500).json({errors: {message: err.message}})
                }
            });
            return res.status(200).json({sucess: {message: 'Poste supprimé avec success.'}});
        });
    }catch (e) {
        return res.status(500).json({errors: {message: e.message}});
    }
});

router.put('/update/:id', function (req, res) {
    try {
            if (req.params.id) {
                let post = Post.findById(req.params.id);
                post.exec(function (err, p) {
                    p.title = req.body.title;
                    p.categories = req.body.categories;
                    p.content = req.body.content;
                    p.suggested = req.body.suggested;
                    p.updated_at = new Date();
                    p.save(function (err, newP) {
                        if(err) {
                            return res.status(400).json({errors: {message: err.message}});
                        }
                        return res.status(200).json(newP);
                    });
                });
            }
    } catch (e) {
        return res.status(500).json({errors: {message: e.message}})
    }
});

router.get('/author/:id', function (req, res) {
    try {
        const authorPost = Post.find({author: req.params.id}).populate('author', 'username');
        authorPost.exec(function (err, c) {
            if (err) {
                return res.status(400).json({errors: {message: err.message}});
            }
            return res.status(200).json(c);
        });
    } catch (err) {
        return res.status(500).json({errors: {message: err.message}});
    }
});

module.exports = router;