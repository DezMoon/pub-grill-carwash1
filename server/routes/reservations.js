// server/routes/reservations.js

const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const {
  getAllReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservations");
const Reservation = require("../models/Reservation");

// Get all reservations
router.get("/", getAllReservations);

// Create a new reservation
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

// Update a reservation
router.put(
  "/:id",
  [
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("phone")
      .optional()
      .isMobilePhone()
      .withMessage("Invalid phone number"),
    body("date")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Invalid date format"),
  ],
  updateReservation
);

// Delete a reservation
router.delete("/:id", deleteReservation);

module.exports = router;
