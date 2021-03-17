'use strict';

/**
 * Module dependencies.
 */
var Form = require('../models/Form.model'),
    errorHandler = require('./../helpers/dbErrorHandler'),
    async = require('async');

// Method to Create Form
exports.createForm = function (req, res) {
    var data = req.body;
    // console.log(req.body)
    var errorResult = {
        error: true,
        message: "",
    }
    async.waterfall([
        function (done) {
            if (!data.name) {
                errorResult.message += "name is missing ";
            }
            if (!data.date) {
                errorResult.message += " date is missing";                
            }
            if (!data.phone) {
                errorResult.message += " Phone number is missing";
            }
            if (data.phone.length!=10) {
                errorResult.message += " Phone number not valid";
            }
            if (!data.organization) {
                errorResult.message += " organization is missing";
            }
            if (!data.source) {
                errorResult.message += " source is missing";
            }
            if (errorResult.message) done(errorResult);
            else done(null, data)
        },
        function (data) {
            var formdata = new Form(data);
            formdata.save(function (err, result) {
                if (err) {
                    // console.log("error----------", err);
                    return res.status(400).json({
                        error: errorHandler.getErrorMessage(err)
                    })
                } else {
                    var outputResult = {
                        id: result._id,
                        name: result.name,
                        phone: result.phone,
                    }
                    res.json({
                        success: 1,
                        "message": "Form Added Successfully",
                        outputResult
                    });
                }
            });
        }

    ], function (err) {
        console.log("error----------", err);
        return res.status(400).send({
            message: err.message
        });
    });
}

// Method to Get all Forms
exports.getAllForms = function (req, res) {
    var data = req.body;
    // console.log(data);
    var matchQuery = {};
    if(data.organization)
    matchQuery.organization = data.organization;
    if(data.source)
    matchQuery.source = data.source;
    if(data.startDate && data.endDate)
        matchQuery.date = { $gte: data.startDate, $lte: data.endDate };
    // console.log(matchQuery);
    Form.find(matchQuery).sort({date:-1}).exec(function (err, forms) {
    // Form.aggregate(
    //     [
    //     //     {
    //     //     $match: ''
    //     // },
    //     // matchCheck,
    //     {
    //         "$project": {
    //             "_id": "$_id",
    //             "name": "$name",
    //             "date": "$date",
    //             "phone": "$phone",
    //             "organization": "$organization",
    //             "rating": "$rating",
    //         }
    //     }, {
    //         "$sort": sort
    //     },

    //     ], function (err, forms) {
        
            if (err) {
                return res.status(400).send({
                    status: 0,
                    message: "Something went wrong"
                })
            }
            if (forms.length) {
                return res.json({
                    status: 1,
                    "Total Records": forms.length,
                    forms
                });
            }
            return res.status(200).send({
                status: 1,
                message: 'No Data found'
            })
        })
}

// Method to Get a particlular Form By ID
exports.getForm = function (req, res) {
    var formID = req.query.id;
    Form.findOne({ _id: formID }).exec(function (err, form) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'Something went wrong'
            })
        }
        if (form) {
            return res.json(form);
        }
        return res.status(200).send({
            status: 1,
            message: 'No Form Stored with this ID'
        })
    })
}

// Method to Update Form By ID
exports.updateForm = function (req, res) {
    var data = req.body;
    Form.findOne({ _id: data.id }).exec(function (err, form) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'Form Id is not correct'
            })
        }
        if (form) {
            if (data.name) {
                form.name = data.name
            }
            if (data.date) {
                form.date = data.date;
            }
            if (data.phone) {
                form.phone = data.phone;
            }
            if (data.organization) {
                form.organization = data.organization;
            }
            if (data.source) {
                form.source = data.source;
            }
            form.save(function (err, result) {
                if (err) {
                    console.log("error----------", err);
                    return res.status(400).send({
                        "message": err
                    });
                } else {
                    var outputResult = {
                        id: result._id,
                        name: result.name,
                    }
                    res.json({
                        success: 1,
                        "message": "Form Updated Successfully",
                        outputResult
                    });
                }
            });
        }
        else {
            return res.json({
                status: 0,
                message: 'No Form Stored with this Id '
            })
        }

    })
}

// Method to delete a particular Form
exports.deleteForm = function (req, res) {
    var formID = req.body.id;
    Form.findOneAndDelete({ _id: formID }).exec(function (err, form) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'something went wrong'
            })
        }
        if (form) {
            res.json({
                status: 1,
                message: "Successfully Deleted",
                "Form Detail": form
            })
        }
        else {
            return res.status(200).send("No Data found with this Id")
        }
    })
}

// Method to Delete all Forms
exports.deleteAllForms = function (req, res) {
    Form.deleteMany({}).exec(function (err, forms) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'No Form found'
            })
        }
        res.send({
            status: 1,
            message: "All Forms Successfully Deleted ",
        })
    })
}
