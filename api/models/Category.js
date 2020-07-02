const mongoose = require('../config/config');


const categorySchema = new mongoose.Schema({
        name: {type: String, required: true, trim: true, minlength: 4, unique: true}
});

categorySchema.virtual('posts',{
    ref: 'Post',
    localField: '_id',
    foreignField: 'categories'
});

const Category = mongoose.model('Category',categorySchema);

module.exports = Category;