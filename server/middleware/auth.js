const jwt = require("jsonwebtoken");
const config = require("../config/config");
const mongoose = require("mongoose");
const User = require("../models/User.model");

exports.authenticatateJWT = (req, res, next) => {
  const { authorization } = req.headers;
  //authorization === Bearer ewefwegwrherhe
  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, config.jwtSecret, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }

    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
