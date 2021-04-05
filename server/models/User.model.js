'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * UserSchema
 */
var UserSchema = new Schema({
    username: {
        type: String,
        trim: true, 
        minlenght: 3, 
        maxlength: 100, 
        required: true 
    },
    email: {
        type: String, 
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    password: {
        type: String,
        required: true
    },
    resetToken:{
        type: String,
        default: null
    },
    expireToken:{
        type:Date,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
})

UserSchema.pre('save', function(next) {
    this.updated_at = new Date;
    next();
});
module.exports = mongoose.model('users', UserSchema);
