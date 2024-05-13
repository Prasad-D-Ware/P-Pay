//import jwt and create a secret for the jwt signing
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./routes/config");

// middleware to authenticate user using the token in header
function authMiddleware(req, res, next) {
  //gets the auth header in a variable
  const authHeader = req.headers.authorization;

  //checks for if header not present of the auth header doesnt begin with Bearer | checkes for the type of header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  //splits it to get the original token value
  const token = authHeader.split(" ")[1];

  //as this code and throw unexpected errors use a try block
  try {
    //verify the jwt using the secret and the token inside header
    const verified = jwt.verify(token, JWT_SECRET);

    // checks header for its value and adds the userId to request
    if (verified.userId) {
      req.userId = verified.userId;
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (e) {
    return res.status(403).json({});
  }
}

//exports
module.exports = {
  authMiddleware,
};
