// server/routes/appointments.js

const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointments");
const Appointment = require("../models/Appointment");

// Get all appointments
router.get("/", getAllAppointments);

// Create a new appointment
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("carModel").notEmpty().withMessage("Car model is required"),
    body("serviceType").notEmpty().withMessage("Service type is required"),
    body("date").isISO8601().toDate().withMessage("Invalid date format"),
  ],
  createAppointment
);

// Update an appointment
router.put(
  "/:id",
  [
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("carModel").optional().notEmpty().withMessage("Car model is required"),
    body("serviceType")
      .optional()
      .notEmpty()
      .withMessage("Service type is required"),
    body("date")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Invalid date format"),
  ],
  updateAppointment
);

// Delete an appointment
router.delete("/:id", deleteAppointment);

module.exports = router;
