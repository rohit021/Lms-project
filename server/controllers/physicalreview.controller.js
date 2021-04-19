'use strict';

/**
 * Module dependencies.
 */
var PhysicalReview = require('../models/PhysicalReview.model'),
    errorHandler = require('../helpers/dbErrorHandler');

// Method to Create Review
exports.createPhysicalReview = function (req, res) {
    var data = req.body;
    var physicalReviewdata = new PhysicalReview(data);
    physicalReviewdata.save(function (err, result) {
        if (err) {
            // console.log("error----------", err);
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        } else {
            var outputResult = {
                id: result._id,
                name: result.name,           
            }
            res.json({
                success: 1,
                "message": "Physical Review Added Successfully",
                outputResult
            });
        }
    });
}
    // method to get all reviews
exports.getAllPhysicalReview = function (req, res) {
    var data = req.body;
    const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
    const skip = parseInt(req.query.skip);
    var sort_parameter = data.orderBy;
    var order = data.order;
    var sort_order = 1;
    if (order == "desc") {
        sort_order = -1;
    }
    var sort = {}, matchQuery = {};
    sort[sort_parameter] = sort_order;
    sort['_id'] = sort_order ==1? -1 : 1;    
    if(data.organization)
        matchQuery.organization = data.organization;
    if(data.center)
        matchQuery.center = data.center;
    if(data.isNegative)
        matchQuery.isNegative = data.isNegative;
    if(data.startDate && data.endDate)
        matchQuery.date = { $gte: data.startDate, $lte: data.endDate };
    console.log(limit, skip);
    PhysicalReview.find(matchQuery).sort(sort).skip(skip).limit(limit).exec(function (err, reviews) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: "Something went wrong"
            })
        }
        if (reviews.length) {
            return res.json({
                status: 1,
                "Total Records": reviews.length,
                reviews
            });
        }
        return res.status(200).send({
            status: 1,
            message: 'No Data found'
        })
    })
}

// Method to Get a Review Form By ID
exports.getPhysicalReview = function (req, res) {
    var reviewId = req.params.id;
    PhysicalReview.findOne({ _id: reviewId }).exec(function (err, review) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'Something went wrong'
            })
        }
        if (review) {
            return res.json(review);
        }
        return res.status(200).send({
            status: 1,
            message: 'No Review Stored with this ID'
        })
    })
}

// Method to Update Review By ID
exports.updatePhysicalReview = function (req, res) {
    var data = req.body;
    PhysicalReview.findOne({ _id: data._id }).exec(function (err, review) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'Physical Review Id is not correct'
            })
        }
        if (review) {
            if (data.name) {
                review.name = data.name
            }
            if (data.phone) {
                review.date = data.date;
            }
            if (data.email) {
                review.email = data.email;
            }
            if (data.isNegative) {
                review.isNegative = data.isNegative;
            }
            if (data.starFood) {
                review.starFood = data.starFood;
            }
            if (data.starClean) {
                review.starClean = data.starClean;
            }
            if (data.starPlace) {
                review.starPlace = data.starPlace;
            }
            if (data.starService) {
                review.starService = data.starService;
            }
            if (data.starMusic) {
                review.starMusic = data.starMusic;
            }
            review.save(function (err, result) {
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
                        "message": "Review Updated Successfully",
                        outputResult
                    });
                }
            });
        }
        else {
            return res.json({
                status: 0,
                message: 'No Review Stored with this Id '
            })
        }

    })
}

// Method to delete a particular Review
exports.deletePhysicalReview = function (req, res) {
    var reviewId = req.params.id;
    PhysicalReview.findOneAndDelete({ _id: reviewId }).exec(function (err, review) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'something went wrong'
            })
        }
        if (review) {
            res.json({
                status: 1,
                message: "Successfully Deleted",
                "review Detail": review
            })
        }
        else {
            return res.status(200).send("No Data found with this Id")
        }
    })
}

// Method to Delete all Reviews
exports.deleteAllPhysicalReviews = function (req, res) {
    PhysicalReview.deleteMany({}).exec(function (err, reviews) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'No Physical Review found'
            })
        }
        res.send({
            status: 1,
            message: "All Reviews Successfully Deleted ",
        })
    })
}

exports.getratingReviews= function(req,res){
    PhysicalReview.find({}).exec(function(err,review){
        if (err) {
            return res.status(400).send({
                status: 0,
                message: err
            })
        }
        if (review) {
            let posCount = 0 , negCount = 0, nps = 0 ;
            for(let i= 0; i< review.length; i++){
                if(review[i].rating == 4 || review[i].rating == 5){
                    posCount++;
                }
                if(review[i].rating == 1 || review[i].rating == 2){
                    negCount++;
                }                
            }
            nps =( posCount - negCount)/review.length *100;
            return res.json({posCount, negCount, nps})
        }
        return res.status(200).send({
            status: 1,
            message: 'No review found'
        })
    })
}