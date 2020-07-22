//Import module node
const mongoose                  = require('mongoose');
const mongooseUniqueValidator   = require('mongoose-unique-validator');
const paginate                  = require('mongoose-paginate-v2');

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

paginate.paginate.options = {
    lean:  true,
    limit: 20
};
    
//adding of mongoose plugin  
mongoose.plugin(mongooseUniqueValidator);
mongoose.plugin(paginate);

module.exports = mongoose;