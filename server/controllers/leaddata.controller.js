'use strict';

/**
 * Module dependencies.d
 */
var Lead = require('../models/Lead.model'),
    errorHandler = require('../helpers/dbErrorHandler');

// Method to Create Form
exports.createLead = function (req, res) {
    var data = req.body;
    // console.log(req.body)
    // return;
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

// Method to Get all Forms
exports.getAllLeads = function (req, res) {
    var data = req.body;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    var sort = {}, matchQuery ={};
    var sort_parameter = data.orderBy;
    var order = data.order;
    var sort_order = 1;
    if (order == "desc") {
        sort_order = -1;
    }
    sort[sort_parameter] = sort_order;
    sort['_id'] = sort_order ==1? -1 : 1;    
    if(data.radixDepartment)
        matchQuery.radixDepartment = data.radixDepartment;
    if(data.organization)
        matchQuery.organization = data.organization;
    if(data.source)
        matchQuery.source = data.source;
    if(data.center)
        matchQuery.center = data.center;
    if(data.category)
        matchQuery.category = data.category;
    if(data.status)
        matchQuery.priority = data.status;    
    if(data.startDate && data.endDate)
        matchQuery.date = { $gte: data.startDate, $lte: data.endDate };
    // console.log(sort);
    // console.log(matchQuery);
    // return;  
    // console.log(limit, skip);
    Lead.find(matchQuery).sort(sort).skip(skip).limit(limit).exec(function (err, leads) {
    // Lead.aggregate(
    //     [{
    //         "$project": {
    //             "_id": "$_id",
    //             "name": "$name",
    //             "date": "$date",
    //             "phone": "$phone",
    //             "organization": "$organization",
    //             "email": "$email",    
    //             "source": "$source",    
    //         }
    //     },
    //     {
    //         $match: matchQuery
    //     },
    //     {
    //         "$sort": sort
    //     },

    //     ], function (err, leads) {        
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
    var leadId = req.params.id;
    Lead.findOne({ _id: leadId }).exec(function (err, lead) {
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
            message: 'No Lead Stored with this ID'
        })
    })
}

// Method to Update Form By ID
exports.updateLead = function (req, res) {
    var data = req.body
    Lead.findOne({ _id: data._id }).exec(function (err, lead) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'Lead Id is not correct'
            })
        }
        if (lead) {
            if (data.name) {
                lead.name = data.name
            }
            if (data.phone) {
                lead.phone = data.phone;
            }
            if(data.email){
                lead.email=data.email;
            }
            if (data.source) {
                lead.source = data.source;
            }
            if (data.organization) {
                lead.organization = data.organization;
            }
            if(data.radixDepartment){
                lead.radixDepartment=data.radixDepartment;
            }
            if(data.doctor){
                lead.doctor=data.doctor;
            }
            if(data.location){
                lead.location=data.location;
            }
            if(data.category){
                lead.category=data.category;
            }
            if(data.propertyName){
                lead.propertyName=data.propertyName;
            }
            if(data.center){
                lead.center=data.center;
            }
            if(data.priority){
                lead.priority=data.priority;
            }
            if(data.expectedAmount){
                lead.expectedAmount=data.expectedAmount;
            }
            if (data.visit) {
                lead.visit = data.visit;
            }
            if (data.remark) {
                lead.remark = data.remark;
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
    var leadId = req.params.id;
    Lead.findOneAndDelete({ _id: leadId }).exec(function (err, lead) {
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
            return res.status(200).send("No Lead data found with this Id")
        }
    })
}

// Method to Delete all Forms
exports.deleteAllLeads = function (req, res) {
    Lead.deleteMany({}).exec(function (err, leads) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'No Lead found'
            })
        }
        res.send({
            status: 1,
            message: "All Leads Successfully Deleted ",
        })
    })
}

exports.getTotalLeads = function(req, res){
    Lead.aggregate([
        {
            $group: {
                _id:{
                    organization: "$organization",                   
                  }, 
                quantity: { $sum: 1 },
            }                
        },        
        {
            $project: {
              _id: 0,
              organization: "$_id.organization",
              count: "$quantity",
            }
        },
        {
            $sort: {
              'date': 1
            }
        }
    ], function (err, leads) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'No Lead found'
            })
        }
        var totalCount = 0;
        for( let i =0; i< leads.length; i++){
            totalCount += leads[i].count;
        }
        // console.log(totalCount);         
        res.json({
            status: 1,
            "total count": totalCount,
            "lead Detail": leads
        })
    })
};