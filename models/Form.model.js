'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * FormSchema
 */
const FormSchema = new Schema({
    name: {
        type: String, 
        lowercase: true, 
        required: true 
    },
    email: {
        type: String, 
        lowercase: true, 
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: true 
    },
    phone: {
        type: String,
        // unique: 'Phone Number already exists',
        lowercase: true,
        default: '',
    },
    date: {
        type: Date,
        default: Date.now
    },
    organization: {
        type: String, 
        maxlength: 30
    },
    source: {
        type: String, 
        maxlength: 30
    },    
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
    },
})

FormSchema.pre('save', function(next) {
    this.updated_at = new Date;
    next();
});
module.exports = mongoose.model('Form', FormSchema);
