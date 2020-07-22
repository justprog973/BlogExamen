const jimp = require('jimp');

module.exports = function (req, res, next,fullPath,nameFile, post){
      jimp.read(fullPath, (err, file) => {
          if (err) throw err;
          file
            .resize(320, 320)
            .quality(100)
            .write(nameFile);
        });
        return res.status(201).json(post);
};