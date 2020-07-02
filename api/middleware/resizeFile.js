const jimp = require('jimp');

module.exports = function(req, res, next){
    if(req.file){
      const fullpathTab = req.session.fullPath.split('/');
      const nameFile = `${fullpathTab[0]}/thumb_${fullpathTab[1]}`;
      jimp.read(req.session.fullPath, (err, file) => {
          if (err) throw err;
          file
            .resize(250, jimp.AUTO)
            .quality(100) 
            .write(nameFile);
        });
        return next();
    }
    return next();
}