const mongoose = require('../config/config');

const postSchema = new mongoose.Schema({
    title        : {type: String, minlength: 5, required: true, trim:true},
    categories   : [{
        required : true,
        type     : mongoose.Schema.Types.ObjectId,
        ref      : 'Category'
    }],
    author       : {
        required : true,
        type     : mongoose.Schema.Types.ObjectId,
        ref      : 'User'
    },
    content      : {type: String, minlength: 1250, maxWidth: 12500, required: true, unique:true},
    attachement  : {type: String, required: true, trim:true},
    suggested    : {type: Boolean, required : true, default: false},
    published    : {type: Boolean, required : true, default: false},
    created_at   : {type: Date , default : Date.now, required: true},
    updated_at   : {type: Date , default : Date.now, required: true}
});


postSchema.virtual('likes',{
    ref: 'User',
    localField: '_id',
    foreignField: 'likes'
});
postSchema.virtual('views',{
    ref: 'User',
    localField: '_id',
    foreignField: 'views'
});
postSchema.virtual('post',{
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'
});
const Post = mongoose.model('Post',postSchema);

module.exports = Post;