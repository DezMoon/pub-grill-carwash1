// server/routes/admin.js

const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth");

// Admin Dashboard route
router.get("/dashboard", authenticateUser, (req, res) => {
  res.render("admin/dashboard"); // Render the admin dashboard view
});

module.exports = router;
