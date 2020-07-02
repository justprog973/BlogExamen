const mongoose = require('../config/config');


const commentSchema = new mongoose.Schema({
        post      : {
            type  : mongoose.Schema.Types.ObjectId,
            ref   : 'Post'
        },
        user      : {
            type  : mongoose.Schema.Types.ObjectId,
            ref   : 'User'
        },
        content   : {type: String, required: true, trim: true, minlength:2},
        created_at: {type: String, required: true, default: Date.now},
        updated_at: {type: String, required: true, default: Date.now}
});


const Comment = mongoose.model('Comments',commentSchema);

module.exports = Comment;