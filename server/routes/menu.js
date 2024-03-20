// server/routes/menu.js

const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const {
  getAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menu");
const MenuItem = require("../models/MenuItem");

// Get all menu items
router.get("/", getAllMenuItems);

// Create a new menu item
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price").isNumeric().withMessage("Invalid price"),
  ],
  createMenuItem
);

// Update a menu item
router.put(
  "/:id",
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

// Delete a menu item
router.delete("/:id", deleteMenuItem);

module.exports = router;
