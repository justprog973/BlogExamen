//Import module node
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');

//Connection at database mongoose
mongoose.connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log(`you present now connected : ${process.env.DB_HOST}`);
    }).catch((err) => {
        console.log(`an error was catch : ${err}`);
    });

//adding of mongoose plugin  
mongoose.plugin(mongooseUniqueValidator);

module.exports = mongoose;