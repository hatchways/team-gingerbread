const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    const userExists = User.exists({ _id: req.user.id });

    if (!req.user || !userExists) {
      return res.status(404).send("User Id is not valid");
    }

    next();
  } catch (err) {
    res.status(401).send("Token is not valid");
  }
};

module.exports = protect;
