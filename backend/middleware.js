const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./routes/config");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }
  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, JWT_SECRET);
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

module.exports = {
  authMiddleware,
};
