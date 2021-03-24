'use strict';

/**
 * Module dependencies.d
 */
var Lead = require('../models/Lead.model'),
    errorHandler = require('../helpers/dbErrorHandler'),
    async = require('async');

// Method to Create Form
exports.createLead = function (req, res) {
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
            if (!data.center) {
                errorResult.message += " center is missing";
            }
            if (!data.amount) {
                errorResult.message += " amount is missing";
            }
            if (!data.priority) {
                errorResult.message += " priority is missing";
            }
            if (!data.source) {
                errorResult.message += " source is missing";
            }
            if (errorResult.message) done(errorResult);
            else done(null, data)
        },
        function (data) {
            var leaddata = new Lead(data);
            leaddata.save(function (err, result) {
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
                        "message": "Lead Added Successfully",
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
exports.getAllLeads = function (req, res) {
    var data = req.body;
    console.log(data);
    var sort_parameter = '', order =''
    if(data.orderBy)
        sort_parameter = data.orderBy;
    if(data.order)
        order = data.order;
    var sort_order = 1;
    if (order == "desc") {
        sort_order = -1;
    }
    var sort = {};
    sort[sort_parameter] = sort_order;
    sort['_id'] = sort_order ==1? -1 : 1;
    
    var matchQuery = {};
    if(data.organization)
    matchQuery.organization = data.organization;
    if(data.source)
    matchQuery.source = data.source;
    if(data.startDate && data.endDate)
        matchQuery.date = { $gte: data.startDate, $lte: data.endDate };
    
   console.log(sort);
        // console.log(matchQuery);
    // Lead.find(matchQuery).sort(sort).exec(function (err, leads) {
    Lead.aggregate(
        [{
            "$project": {
                "_id": "$_id",
                "name": "$name",
                "date": "$date",
                "phone": "$phone",
                "organization": "$organization",
                "email": "$email",    
                "source": "$source",    
            }
        },
        {
            $match: matchQuery
        },
        {
            "$sort": sort
        },

        ], function (err, leads) {
        
            if (err) {
                return res.status(400).send({
                    status: 0,
                    message: "Something went wrong"
                })
            }
            if (leads.length) {
                return res.json({
                    status: 1,
                    "Total Records": leads.length,
                    leads
                });
            }
            return res.status(200).send({
                status: 1,
                message: 'No Data found'
            })
        })
}

// Method to Get a particlular Form By ID
exports.getLead = function (req, res) {
    var leadID = req.query.id;
    Lead.findOne({ _id: leadID }).exec(function (err, lead) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'Something went wrong'
            })
        }
        if (lead) {
            return res.json(lead);
        }
        return res.status(200).send({
            status: 1,
            message: 'No Form Stored with this ID'
        })
    })
}

// Method to Update Form By ID
exports.updateLead = function (req, res) {
    var data = req.body;
    Lead.findOne({ _id: data.id }).exec(function (err, lead) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'Form Id is not correct'
            })
        }
        if (lead) {
            if (data.name) {
                lead.name = data.name
            }
            if (data.date) {
                lead.date = data.date;
            }
            if (data.phone) {
                lead.phone = data.phone;
            }
            if (data.organization) {
                lead.organization = data.organization;
            }
            if (data.source) {
                lead.source = data.source;
            }
            lead.save(function (err, result) {
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
                        "message": "Lead Updated Successfully",
                        outputResult
                    });
                }
            });
        }
        else {
            return res.json({
                status: 0,
                message: 'No Lead Stored with this Id '
            })
        }

    })
}

// Method to delete a particular Lead
exports.deleteLead = function (req, res) {
    var leadID = req.body.id;
    Lead.findOneAndDelete({ _id: leadID }).exec(function (err, lead) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'something went wrong'
            })
        }
        if (lead) {
            res.json({
                status: 1,
                message: "Successfully Deleted",
                "lead Detail": lead
            })
        }
        else {
            return res.status(200).send("No Data found with this Id")
        }
    })
}

// Method to Delete all Forms
exports.deleteAllLeads = function (req, res) {
    Lead.deleteMany({}).exec(function (err, leads) {
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
