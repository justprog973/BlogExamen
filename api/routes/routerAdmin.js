const router = require('express').Router();
const Category = require('../models/Category');


router.post('/category/add',function(req,res){
    const fieldCategory = {name : req.body.name};
    try{
        if(fieldCategory.name.length >= 4){
            new Category(fieldCategory).save().then(()=>{
                return res.status(201).json({success: {message: 'La categorie a été ajouté avec success'}});
            }).catch(e => res.status(500).json({errors: {message: e.message}}));
            
        }else{
            return res.status(400).json({errors: {name :{message: 'Le champ name doit comporter au moins 4 caractéres'}}});
        }
    }catch(e){
        return res.status(500).json({errors: {message: e.message}});
    }
});

module.exports = router;