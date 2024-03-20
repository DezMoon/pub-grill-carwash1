// server/routes/menu.js

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const {
  getAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menu");
const { authenticateUser } = require("../middleware/auth");
const upload = require("../middleware/upload");
const MenuItem = require("../models/MenuItem");

// Get all menu items (Admin)
router.get("/", authenticateUser, getAllMenuItems);

// Create a new menu item (Admin)
router.post(
  "/",
  authenticateUser,
  upload.single("image"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price").isNumeric().withMessage("Invalid price"),
  ],
  createMenuItem
);

// Update a menu item (Admin)
router.put(
  "/:id",
  authenticateUser,
  upload.single("image"),
  [
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Description is required"),
    body("price").optional().isNumeric().withMessage("Invalid price"),
  ],
  updateMenuItem
);

// Delete a menu item (Admin)
router.delete("/:id", authenticateUser, deleteMenuItem);

module.exports = router;
