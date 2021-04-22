var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RelpSourceSchema = new Schema(
    {
        text : {
            type: String,
            required: true
        },
        key : {
            type: String,
            unique: true,
            required: true
        },
        value : {
            type: String,
            unique: true,
            required: true
        },
        keyIndex: {
            type: Number,
            unique: true
        }
    }
    ,{ timestamps: true })
    module.exports = mongoose.model('RelpSource', RelpSourceSchema);