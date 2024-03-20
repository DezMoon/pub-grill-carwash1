// server/models/Appointment.js

const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  // Define schema fields for appointment
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
