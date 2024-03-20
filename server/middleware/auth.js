// server/middleware/auth.js

const jwt = require("jsonwebtoken");

// Middleware function to verify JWT token
exports.authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Invalid Token" });
  }
};
