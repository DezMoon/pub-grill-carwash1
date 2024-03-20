// server/routes/appointments.js

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointments");
const { authenticateUser } = require("../middleware/auth");
const Appointment = require("../models/Appointment");

// Get all appointments (Admin)
router.get("/", authenticateUser, getAllAppointments);

// Create a new appointment (User)
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

// Update an appointment (Admin)
router.put(
  "/:id",
  authenticateUser,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("carModel").notEmpty().withMessage("Car model is required"),
    body("serviceType").notEmpty().withMessage("Service type is required"),
    body("date").isISO8601().toDate().withMessage("Invalid date format"),
  ],
  updateAppointment
);

// Delete an appointment (Admin)
router.delete("/:id", authenticateUser, deleteAppointment);

module.exports = router;
