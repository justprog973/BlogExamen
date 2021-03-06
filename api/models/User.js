const mongoose = require('../config/config');

const userSchema = new mongoose.Schema({
    username    : {type : String ,required : true, unique: true, trim:true, minlength:4},
    email       : {type : String ,required : true, unique: true, trim:true},
    password    : {type : String ,required : true , trim:true, minlength: 6},
    firstname   : {type : String , trim:true},
    lastname    : {type : String , trim:true},
    isActive    : {type : Boolean, required: true, default: true},
    isAdmin     : {type: Boolean ,required : true , default: false},
    resetToken  : String,
    expireToken : Date,
    created_at  : {type : Date , default : Date.now},
    updated_at  : {type : Date , default : Date.now}
});

userSchema.virtual('author',{
    ref: 'Post',
    localField: '_id',
    foreignField: 'author'
});

userSchema.virtual('user',{
    ref: 'Comment',
    localField: '_id',
    foreignField: 'user'
});

const User =  mongoose.model('User',userSchema);

module.exports = User ;