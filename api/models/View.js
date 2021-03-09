const mongoose = require('../config/config');

const viewSchema = new mongoose.Schema({
    visitor : {type : String, required : true},
    post    : {
        required : true,
        type     : mongoose.Schema.Types.ObjectId,
        ref      : 'Post'
    },
    created_at: {type: Date, required: true, default: Date.now}
});

const View = mongoose.model('View',viewSchema);

module.exports = View;