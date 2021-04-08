'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * ReviewSchema
 */
const PhysicalReviewSchema = new Schema({
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
    center: {
        type:  String,
        required: true
    },
    isNegative:{
        type: Boolean,
        required:true
    },
    starFood: {
        type:  String,
        // required: true
    },
    starClean: {
        type:  String,
        // required: true
    },
    starPlace: {
        type:  String,
        // required: true
    },
    starService: {
        type:  String,
        // required: true
    },
    starMusic: {
        type:  String,
        // required: true
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

PhysicalReviewSchema.pre('save', function(next) {
    this.updated_at = new Date;
    next();
});
module.exports = mongoose.model('PhysicalReview', PhysicalReviewSchema);
