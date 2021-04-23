'use strict';

/**
 * Module dependencies.
 */
var User = require('../models/User.model'),
    async = require('async'), 
    crypto = require('crypto'),
    moment = require('moment'),
    config = require('../config/config'),
    nodemailer = require('nodemailer'),
    smtpTransport = nodemailer.createTransport(config.smtp),
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
                                setLastLoginTime(result,'web');
                                jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' }, (err, token) => {
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
                            setLastLoginTime(user,'web');
                            jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' }, (err, token) => {
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
    const token = req.headers.authorization.split(" ")[1];
    try {
    //   const token = req.body.token;
      console.log(token);
      if (!token) return res.json(false);
  
      jwt.verify(token, config.jwtSecret);
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

exports.resetPassword = function (req, res) {
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                var emailArgs = {
                    url: config.clienthost + '/auth/reset/' + token,
                    name: user.username,                    
                };   
                var mailOptions = {
                    to: user.email,
                    from: config.email.service,
                    subject: "Password reset? ",
                    html: `
                    <p>Hello <strong>${emailArgs.name}</strong></p>
                    <div>
                        <p>You requested for password reset</p>
                        <h5>click in this <a href="${emailArgs.url}">link</a> to reset password</h5>
                    </div>
                    `
                };        
                smtpTransport.sendMail(mailOptions, function(err) {
                    if(err){
                        console.log('Error while sending user email ' + JSON.stringify(err));
                    }
                    else{
                        res.json({message:"check your email"})
                    }
                });
            })
        })
    })
};

exports.newPassword = function (req, res) {
   const newPassword = req.body.password
   const sentToken = req.params.token
   User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
   .then(user=>{
       if(!user){
           return res.status(422).json({error:"Try again session expired"})
       }
       bcrypt.hash(newPassword,12).then(hashedpassword=>{
          user.password = hashedpassword
          user.resetToken = undefined
          user.expireToken = undefined
          user.save().then((saveduser)=>{
              res.json({message:"password updated success"})
          })
       })
   }).catch(err=>{
       console.log(err)
   })
};

exports.validateResetToken = function(req, res) {
    User.findOne({
        resetToken: req.params.token,
        expireToken: {
            $gt: Date.now()
        }
    }, function(err, user) {
        if (!user) {
            // return res.redirect('/password/reset/invalid');
        }

        res.redirect('/login');
    });
};

const setLastLoginTime = function(user,platform){
    console.log("last login time called --",user.email,platform)
    User.findOne({email: user.email}).exec().then(
        function(usr){
            if(platform=='web'){
                usr.lastLoginTime = new Date(moment().format("YYYY-MM-DD HH:mm:ss")+ "Z");
            }
            usr.save(function(err){
                if(err) console.log("user lastlogintime not saved");
                console.log("user last login time saved successsfully ",usr.lastLoginTime);
            })
        }
    )
}