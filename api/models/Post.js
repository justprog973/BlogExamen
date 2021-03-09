const mongoose = require('../config/config');

const postSchema = new mongoose.Schema({
    title: {type: String, minlength: 5, required: true, trim: true},
    categories: [{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    author: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {type: String, minlength: 1250, required: true, unique: true},
    attachment: {type: String, required: true, trim: true},
    suggested: {type: Boolean, required: true, default: false},
    published: {type: Boolean, required: true, default: false},
    created_at: {type: Date, default: Date.now, required: true},
    updated_at: {type: Date, default: Date.now, required: true}
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;