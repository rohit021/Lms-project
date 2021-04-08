'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * ReviewSchema
 */
const ReviewSchema = new Schema({
    name: {
        type: String, 
        lowercase: true, 
        required: true 
    },
    email: {
        type: String, 
        lowercase: true, 
        required: true 
    },
    phone: {
        type: String,
        required: true,
        default: '--',
    },
    comment:{
        type: String,
        required:true
    },
    reply:{
        type:String
    },
    rating:{
        type:Number,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    organization: {
        type: String, 
        maxlength: 30,
        required:true
    },
    center:{
        type: String, 
        maxlength: 30,
        required:true
    },
    platform:{
        type: String, 
        maxlength: 30,
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

ReviewSchema.pre('save', function(next) {
    this.updated_at = new Date;
    next();
});
module.exports = mongoose.model('Review', ReviewSchema);
