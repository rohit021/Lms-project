const jwt = require("jsonwebtoken");
const config = require('../config/config');

exports.authenticatateJWT = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    const verified = jwt.verify(token, config.jwtSecret);
    req.user = verified.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}
