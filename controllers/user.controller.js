'use strict';

/**
 * Module dependencies.
 */
var User = require('../models/User.model'),
    mongoose = require('mongoose'),
    async = require('async'), 
    config = require('../config/config'),
    jwt = require('jsonwebtoken'),
    bcrypt = require("bcryptjs");
    
// Method to Create New User
exports.createUser = function(req, res) {
    var data = req.body;
    if (!data.email || !data.password )
      return res
        .status(400)
        .json({ error: "Please enter all required fields." });

    if (data.password.length < 6)
      return res.status(400).json({
        error: "Please enter a password of at least 6 characters.",
      });

    User.findOne({email:data.email}).exec(function(err,user){
        if(user){
            return res.status(400).json({error:"Email Already Exists"})
        }
        else{
            // console.log(data);
            const newUser = new User(data);
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(data.password, salt, function(err, hash) {
                    if(err) console.log(err)
                    else{
                        newUser.password = hash;
                        newUser.save(function(err,result) {
                            if (err) {
                                console.log("error----------",err);
                                return res.status(400).send({
                                    "message": err
                                });
                            } else {
                                const payload = {
                                    userId:result._id,
                                    email: result.email
                                }
                                jwt.sign(payload, config.secretKey, { expiresIn: 3600 }, (err, token) => {
                                    // console.log(token);
                                    res.cookie("token", token, {
                                        httpOnly: true,
                                        expire: new Date() + 9999,                                        
                                      })
                                    res.status(200).json({ 
                                        token,
                                        user: {
                                            name: result.username,
                                            email: result.email,
                                        }
                                    });
                                })
                            }
                        })                        
                    }
                })
            })
        }
    })
};
// Method to Login the User
exports.loginUser = function(req, res) {
    var data = req.body;
    var errorResult = {}
    async.waterfall([
        function(done){
            if (!data.email || data.email =='' ) {
                errorResult.email= " email is required";                
            }
            if (!data.password || data.password == '') {
                errorResult.password = " password is required";                
            }
            if (data.password.length < 6)
                return res.status(400).json({
                    error: "Please enter a password of at least 6 characters.",
                });
            if(Object.keys(errorResult).length) done(errorResult);
            else done(null,data)
        },
        function (data) {
            User.findOne({email:data.email}).exec(function(err,user){
                if(!user){
                    return res.status(400).json({error:"User Not Found"})
                }
                else{
                    bcrypt.compare(data.password, user.password, (err, result) => {
                        if(result){
                            const payload = {
                                userId:user.id,
                                email: user.email
                            }
                            jwt.sign(payload, config.secretKey, { expiresIn: 3600 }, (err, token) => {
                                res.cookie("token", token, {
                                    httpOnly:true,
                                    expire: new Date() + 9999
                                })
                                res.status(200).json({ 
                                    token,
                                    user: {
                                        name: user.username,
                                        email: user.email,
                                    }
                                });
                            })
                        }
                        else{
                            return res.status(400).json({error:"Password Incorrect"})
                        }
                    })
                }
            })
        }

    ], function(err) {
        console.log("error----------",err);
        return res.status(400).send({
            message: err
        });
    });
}

// Method to Logout the User
exports.logOutUser = function (req, res) {
    res.clearCookie("token")
    return res.status('200').json({
      message: "signed out"
    })
}

// Method to verify the User
exports.loggedIn = function (req, res) {
    try {
      const token = req.cookies.token;
      console.log(token);
      if (!token) return res.json(false);
  
      jwt.verify(token, config.secretKey);
      res.send(true);
    } catch (err) {
      res.json(false);
    }
};
  
// Method to Get all Users

exports.getAllUsers = function (req, res){
    User.find({}).exec(function(err,users){
        if(err){
            return res.status(400).send({
                status:0,
                message: "Something went wrong"
            })
        }
        if(users.length){
            return res.json({
                "Total Records":users.length,
                data: users
            });
        }
        return res.status(200).send({
            status:1,
            message: 'No Data found'
        })
    })
}
// Method to Delete all Users
exports.deleteAllUsers = function (req, res) {
    User.deleteMany({}).exec(function(err,users){
        if(err){
            return res.status(400).send({
                status:0,
                message: 'No users found'
            })
        }
        res.send({
            status:1,
            message:"All users Successfully Deleted ",
        })
    })
}
