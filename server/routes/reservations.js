// server/routes/reservations.js

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const {
  getAllReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservations");
const { authenticateUser } = require("../middleware/auth");
const Reservation = require("../models/Reservation");

// Get all reservations (Admin)
router.get("/", authenticateUser, getAllReservations);

// Create a new reservation (User)
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("phone").isMobilePhone().withMessage("Invalid phone number"),
    body("date").isISO8601().toDate().withMessage("Invalid date format"),
  ],
  createReservation
);

// Update a reservation (Admin)
router.put(
  "/:id",
  authenticateUser,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("phone").isMobilePhone().withMessage("Invalid phone number"),
    body("date").isISO8601().toDate().withMessage("Invalid date format"),
  ],
  updateReservation
);

// Delete a reservation (Admin)
router.delete("/:id", authenticateUser, deleteReservation);

module.exports = router;
