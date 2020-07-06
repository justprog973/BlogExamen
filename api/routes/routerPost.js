const router = require('express').Router();
const Post   = require('../models/Post');
const importFile = require('../middleware/importFile');
const resizeFile = require('../middleware/resizeFile');

router.post('/create',importFile.single('attachement'),resizeFile,(req,res)=>{
   // create an object with what the has to send
    let fieldPost = {
        title       : req.body.title,
        categories  : req.body.categories,
        content     : req.body.content,
        attachement : req.file ? req.file.filename : null,
        author      : req.user.id,
        suggested   : req.body.suggested,
        published   : req.body.published
    };
   
   if(!Array.isArray(fieldPost.categories)){
    fieldPost.categories = fieldPost.categories.split(" ");
   }
    //object for contain errors
    let title      = {};
    let categories = {};
    let content    = {};
    let attachement= {};
    let errors     = {};

    if(fieldPost.title.length < 5){
        title = {title: {message: "Le champ titre doit contenir au moins 5 caractéres."}};
    }
    if(fieldPost.categories.length < 0){
        categories = {categories: {message: "Le champ categories est obligatoire."}};
    }
    if(!attachement){
        attachement = {attachement: {message: "Le champ attachement est obligatoire."}};
    }
    if(content.length < 200){
        content = {content: {message: "Le champ content doit compoter au moins 200 caractéres."}};
    }
    errors = {...title,...categories,...attachement};
    if(Object.entries(errors).length > 0){
        return res.status(400).json({errors});
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