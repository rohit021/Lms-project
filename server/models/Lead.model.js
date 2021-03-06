'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * LeadSchema
 */
const LeadSchema = new Schema({
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
    date: {
        type: Date,
        default: Date.now
    },
    organization: {
        type: String, 
        maxlength: 30,
        required:true
    },
    category: {
        type: String, 
        maxlength: 30,
    },
    doctor: {
        type: String, 
        maxlength: 30,
    },
    center:{
        type: String, 
        maxlength: 30,
    },
    radixDepartment:{
        type: String, 
        maxlength: 30,
    },
    location:{
        type:String,
        maxlength:30
    },
    propertyName:{
        type:String,
        maxlength:30
    },
    remark:{
        type: String,
    },
    visit:{
        type: String,
    },
    expectedAmount:{
        type:Number,
        default: 0
    },
    source: {
        type: String, 
        maxlength: 30,
        required:true
    }, 
    priority:{
        type:String,
        required:true
    }, 
    otherspecify: {
        type:String,     
    },  
    date: {
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

LeadSchema.pre('save', function(next) {
    this.updated_at = new Date;
    next();
});
module.exports = mongoose.model('Lead', LeadSchema);
