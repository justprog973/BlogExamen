const mongoose = require('mongoose');


const articleSchema = mongoose.Schema({
    title: {type : string, require= true},
    content: {type : string, require= true},
    create_at: {type : date, default : new Date,require= true},
    update_at: {type : date, default : new Date, require= true}
});


const article = mongoose.SchemaType('Article', articleSchema);

module.exports = article;