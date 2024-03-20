// server/controllers/appointments.js

const { validationResult } = require("express-validator");
const Appointment = require("../models/Appointment");

// Get all appointments (Admin)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new appointment (User)
exports.createAppointment = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, carModel, serviceType, date } = req.body;
    const appointment = new Appointment({ name, carModel, serviceType, date });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update an appointment (Admin)
exports.updateAppointment = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name, carModel, serviceType, date } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { name, carModel, serviceType, date },
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(updatedAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete an appointment (Admin)
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(deletedAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
