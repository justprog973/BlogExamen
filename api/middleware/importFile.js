const multer    = require('multer');
const fs        = require('fs');
const path      = require('path');

const storage = multer.diskStorage({
    /**
     *
     * @param req
     * @param file
     * @param cb
     * @returns {any}
     */
    destination: function (req, file, cb) {
        const dirPath = path.join(__dirname,`../../front/public/uploads/posts`);
        req.session.dirPath = req.session.dirPath = dirPath;
        if(!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath, {
                recursive: true
              });
        }
        return cb(null, dirPath);
    },
    /**
     *
     * @param req
     * @param file
     * @param cb
     * @returns {any}
     */
    filename: function (req, file, cb) {
        if(file){
            const extension =  file.mimetype.split('/')[1];
            const nameFile  = `${Date.now() + Math.random()}_post.${extension}`;
            req.session.fullPath = `${req.session.dirPath}/${nameFile}`;
            req.session.dirPath = undefined;
            return cb(null, nameFile);
        }
        return cb(null, false);
    }
});
/**
 *
 * @param req
 * @param file
 * @param cb
 * @returns {any}
 */
const filter = function(req,file, cb){
    const extensions =['png','jpg','jpeg'];
    if(file){
        if(extensions.includes(file.mimetype.split('/')[1])){
            return cb(null,true);
        }
    }else{
        return cb(null,false);
    }
    return cb(new Error('Une errer s\'est produit'));
};

module.exports = multer({
    fileFilter: filter,
    storage: storage
});