'use strict';

/**
 * Module dependencies.
 */
var Review = require('../models/Review.model'),
    errorHandler = require('../helpers/dbErrorHandler'),
    async = require('async');

// Method to Create Review
exports.createReview = function (req, res) {
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
            if (!data.rating) {
                errorResult.message += " rating is missing";                
            }
            if(!data.comment){
                errorResult.message+=" comment is missing";
            }
            if (!data.organization) {
                errorResult.message += " organization is missing";
            }
            if (!data.center) {
                errorResult.message += " center is missing";
            }
            if (!data.platform) {
                errorResult.message += " platform is missing";
            }
            if (errorResult.message) done(errorResult);
            else done(null, data)
        },
        function (data) {
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
                        comment:result.comment,
                        rating:result.rating
                    }
                    res.json({
                        success: 1,
                        "message": "Review Added Successfully",
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
    // method to get all reviews
exports.getAllReview = function (req, res) {
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
    Review.find(matchQuery).sort({date:-1}).exec(function (err, reviews) {
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
    var reviewID = req.query.id;
    Review.findOne({ _id: reviewID }).exec(function (err, review) {
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
    Review.findOne({ _id: data.id }).exec(function (err, review) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'Form Id is not correct'
            })
        }
        if (review) {
            if (data.name) {
                review.name = data.name
            }
            if (data.date) {
                review.date = data.date;
            }
            if (data.platform) {
                review.platform = data.platform;
            }
            if (review.organization) {
                review.organization = data.organization;
            }
            if (data.rating) {
                review.rating = data.rating;
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
    var reviewID = req.query.id;
    Review.findOneAndDelete({ _id: reviewID }).exec(function (err, review) {
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
                message: 'No Form found'
            })
        }
        res.send({
            status: 1,
            message: "All Reviews Successfully Deleted ",
        })
    })
}

exports.getratingReviews= function(req,res){
    Review.find({}).exec(function(err,review){
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
            // return res.json(review);
            return res.json({posCount, negCount, nps})
        }
        return res.status(200).send({
            status: 1,
            message: 'No review found'
        })
    })
}