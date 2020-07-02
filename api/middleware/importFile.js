const multer = require('multer');
const fs     = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dirPath = path.join(__dirname,`../../front/src/uploads/posts`);
        req.session.dirPath = req.session.dirPath = dirPath;
        if(!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath, {
                recursive: true
              });
        }
        return cb(null, dirPath);
    },
    filename: function (req, file, cb) {
        const extension =  file.mimetype.split('/')[1];
        const nameFile  = `${Date.now() + Math.random()}_post.${extension}`;
        req.session.fullPath = `${req.session.dirPath}/${nameFile}`;
        req.session.dirPath = undefined;
        return cb(null, nameFile);
    }
});
const filter = function(req,file, cb){
    extension =['png','jpg','jpeg'];
    if(file){
        if(extension.includes(file.mimetype.split('/')[1])){
            return cb(null,true);
        }
    }else{
        return cb(null,false);
    }
    return cb(new Error('Une errer s\'est produit'));
}

module.exports = multer({
    fileFilter: filter,
    storage: storage
});