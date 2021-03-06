'use strict';

/**
 * Module dependencies.
 */
var Review = require('../models/Review.model'),
    moment = require('moment'),
    async = require("async"),
    errorHandler = require('../helpers/dbErrorHandler');

// Method to Create Review
exports.createReview = function (req, res) {
    var data = req.body;
    var reviewdata = new Review(data);
    reviewdata.save(function (err, result) {
        if (err) {
            // console.log("error----------", err);
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        } else {
            var outputResult = {
                id: result._id,
                name: result.name,
                review:result.review,
                rating:result.rating
            }
            res.json({
                success: 1,
                "message": "Review Added Successfully",
                outputResult
            });
        }
    });
};

// method to get all reviews
exports.getAllReview = function (req, res) {
    var data = req.body;
    const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
    const skip = parseInt(req.query.skip);
    var sort_parameter = data.orderBy;
    var order = data.order;
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
    if(data.platform)
        matchQuery.platform = data.platform;
    if(data.center)
        matchQuery.center = data.center;
    if(data.isNegative)
        matchQuery.isNegative = data.isNegative;
    if(data.minValue)
        matchQuery.rating = { $gte: data.minValue, $lte: data.maxValue };
    if(data.startDate && data.endDate)
        matchQuery.date = { $gte: new Date(data.startDate), $lte: new Date(data.endDate) };
    if(data.search){
        var regx = new RegExp(data.search, "i");
        matchQuery.name = {
            $regex: regx
        };
    }
    // console.log(matchQuery, sort);
    // return
    Review.find(matchQuery).sort(sort).skip(skip).limit(limit).exec(function (err, reviews) {
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
exports.getReview = function (req, res) {
    var reviewId = req.params.id;
    Review.findOne({ _id: reviewId }).exec(function (err, review) {
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
exports.updateReview = function (req, res) {
    var data = req.body;
    Review.findOne({ _id: data._id }).exec(function (err, review) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'Review Id is not correct'
            })
        }
        if (review) {
            if (data.name) {
                review.name = data.name
            }
            if (data.review) {
                review.review = data.review;
            }
            if (data.reply) {
                review.reply = data.reply;
            }
            if (data.rating) {
                review.rating = data.rating;
            }
            if (review.isNegative) {
                review.isNegative = data.isNegative;
            }
            if (data.platform) {
                review.platform = data.platform;
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
exports.deleteReview = function (req, res) {
    var reviewId = req.params.id;
    Review.findOneAndDelete({ _id: reviewId }).exec(function (err, review) {
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
exports.deleteAllReviews = function (req, res) {
    Review.deleteMany({}).exec(function (err, reviews) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'No Review found'
            })
        }
        res.send({
            status: 1,
            message: "All Reviews Successfully Deleted ",
        })
    })
}

exports.getReviewNps= function(req,res){
    var data = req.body;
    var matchQuery = {};
    if(data.organization)
        matchQuery.organization = data.organization;
    if(data.center)
        matchQuery.center = data.center;
    if(data.isNegative)
        matchQuery.isNegative = data.isNegative;
    if(data.startDate && data.endDate)
        matchQuery.date = { $gte: new Date(data.startDate), $lte: new Date(data.endDate) };
    if(data.search){
        var regx = new RegExp(data.search, "i");
        matchQuery.name = {
            $regex: regx
        };
    }
    Review.find(matchQuery).exec(function(err,review){
        if (err) {
            return res.status(400).send({
                status: 0,
                message: err
            })
        }
        if (review) {
            // console.log(review.length);
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
            nps = nps ? Math.round(nps) : 0;
            // return res.json(review);
            return res.json({posCount, negCount, nps})
        }
        return res.status(200).send({
            status: 1,
            message: 'No review found'
        })
    })
}

exports.getTotalReviews = function(req, res){
    Review.aggregate([
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
    ], function (err, reviews) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'No Review found'
            })
        }
        var totalCount = 0;
        for( let i =0; i< reviews.length; i++){
            totalCount += reviews[i].count;
        }
        // console.log(totalCount);         
        res.json({
            status: 1,
            "total count": totalCount,
            "Reviews Detail": reviews
        })
    })
};
