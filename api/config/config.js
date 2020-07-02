const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

mongoose.connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`you present now connected : ${process.env.DB_HOST}`);
    }).catch((err) => {
        console.log(`an error was catch : ${err}`);
    });
    
    mongoose.plugin(mongooseUniqueValidator);

module.exports = mongoose;