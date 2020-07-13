const router        = require('express').Router();
const Post          = require('../models/Post');
const importFile    = require('../middleware/importFile');
const resizeFile    = require('../middleware/resizeFile');

router.post('/create',importFile.single('attachment'),resizeFile,(req,res)=>{

   // create an object with what the has to send
    let fieldPost = {
        title       : req.body.title,
        categories  : req.body.categories,
        content     : req.body.content,
        attachment  : req.files ? req.files.filename : undefined,
        author      : req.user.id,
        suggested   : req.body.suggested,
    };

    if(!Array.isArray(fieldPost.categories)){
        fieldPost.categories = fieldPost.categories.split(",");
    }
     try{
        new Post(fieldPost).save().then((save)=>{
            res.status(201).json({success:{message: `Votre post a bien étè crée.`}});
        }).catch(e => res.status(500).json({errors: {message: e.message}}));
    }catch(e){
        return res.status(500).json({errors: {message: e.message}});
    }
});

module.exports = router;


/**
 //object for contain errors
 let title      = {};
 let categories = {};
 let content    = {};
 let attachment = {};

 if(fieldPost.title.trim().length < 5){
        title = {title: {message: "Le champ titre doit contenir au moins 5 caractéres."}};
    }
 if(fieldPost.categories.trim().length <= 0){
        categories = {categories: {message: "Le champ categories est obligatoire."}};
    }
 if(!attachment){
        attachment = {attachment: {message: "Le champ attachment est obligatoire."}};
    }
 if(fieldPost.content.trim().length < 1250 || fieldPost.content.trim().length > 12500){
        content = {content: {message: "Le champ content doit compoter 1250 à 12500 caractéres."}};
    }
 let errors = {...title,...categories,...attachment,...content};
 if(Object.entries(errors).length > 0){
        return res.status(400).json({errors});
    }
 **/