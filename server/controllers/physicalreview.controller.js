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
        matchQuery.date = { $gte: new Date(data.startDate), $lte: new Date(data.endDate) };
    if(data.search){
        var regx = new RegExp(data.search, "i");
        matchQuery.name = {
            $regex: regx
        };
    }        
    // console.log(limit, skip);
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



exports.getPhysicalReviewNps= function(req,res){
    var data = req.body;
    var matchQuery = {};
    if(data.organization)
        matchQuery.organization = data.organization;
    if(data.center)
        matchQuery.center = data.center;
    if(data.isNegative)
        matchQuery.isNegative = data.isNegative;
    if(data.startDate && data.endDate)
        matchQuery.date = { $gte: data.startDate, $lte: data.endDate };
        PhysicalReview.find(matchQuery).exec(function(err,review){
        if (err) {
            return res.status(400).send({
                status: 0,
                message: err
            })
        }
        if (review) {
            // console.log(review.length);
            let posMusicCount = 0 , negMusicCount = 0, musicNps = 0 ;
            let posFoodCount = 0 , negFoodCount = 0, foodNps = 0 ;
            let posCleanCount = 0 , negCleanCount = 0, cleanNps = 0 ;
            let posPlaceCount = 0 , negPlaceCount = 0, placeNps = 0 ;
            let posServiceCount = 0 , negServiceCount = 0, serviceNps = 0 ;
            for(let i= 0; i< review.length; i++){
                //music
                if(review[i].starMusic == 4 || review[i].starMusic == 5){
                    posMusicCount++;
                }
                if(review[i].starMusic == 1 || review[i].starMusic == 2){
                    negMusicCount++;
                }  
                //food 
                if(review[i].starFood == 4 || review[i].starFood == 5){
                    posFoodCount++;
                }
                if(review[i].starFood == 1 || review[i].starFood == 2){
                    negFoodCount++;
                }  
                //clean
                if(review[i].starClean == 4 || review[i].starClean == 5){
                    posCleanCount++;
                }
                if(review[i].starClean == 1 || review[i].starClean == 2){
                    negCleanCount++;
                }       
                //place
                if(review[i].starPlace == 4 || review[i].starPlace == 5){
                    posPlaceCount++;
                }
                if(review[i].starPlace == 1 || review[i].starPlace == 2){
                    negPlaceCount++;
                }      
                //Service
                if(review[i].starService == 4 || review[i].starService == 5){
                    posServiceCount++;
                }
                if(review[i].starService == 1 || review[i].starService == 2){
                    negServiceCount++;
                }   
            }
            //music Nps
            musicNps =( posMusicCount - negMusicCount)/review.length *100;
            musicNps = musicNps ? Math.round(musicNps) : 0;
            // food Nps
            foodNps =( posFoodCount - negFoodCount)/review.length *100;
            foodNps = foodNps ? Math.round(foodNps) : 0;
            //Clean Nps
            cleanNps =( posCleanCount - negCleanCount)/review.length *100;
            cleanNps = cleanNps ? Math.round(cleanNps) : 0;
            //place nps
            placeNps =( posPlaceCount - negPlaceCount)/review.length *100;
            placeNps = placeNps ? Math.round(placeNps) : 0;
            //Service
            serviceNps =( posServiceCount - negServiceCount)/review.length *100;
            serviceNps = serviceNps ? Math.round(serviceNps) : 0;
            // return res.json(review);
            return res.json({
             "Music" : {
                "posCount" : posMusicCount,
                "negcount": negMusicCount,
                 "nps" : musicNps
                }, 
               "Food": {
                    "posCount":posFoodCount,
                    "negCount": negFoodCount, 
                    "nps":foodNps
                },
               "Clean": {
                    "posCount":posCleanCount,
                    "negCount": negCleanCount,
                    "nps": cleanNps
                },
               "Place": {
                    "posCount":posPlaceCount, 
                    "negCount": negPlaceCount,
                    "nps": placeNps
                },
               "Service": {
                  "posCount": posServiceCount, 
                 "negCount": negServiceCount,
                 "nps":serviceNps
                }
            }
            
            )
        }
        return res.status(200).send({
            status: 1,
            message: 'No review found'
        })
    })
}
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

exports.getTotalPhysicalReviews = function(req, res){
    PhysicalReview.aggregate([
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
    ], function (err, physicalReviews) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'No Physical Review found'
            })
        }
        var totalCount = 0;
        for( let i =0; i< physicalReviews.length; i++){
            totalCount += physicalReviews[i].count;
        }
        // console.log(totalCount);         
        res.json({
            status: 1,
            "total count": totalCount,
            "Physical Reviews Detail": physicalReviews
        })
    })
};