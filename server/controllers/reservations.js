// server/controllers/reservations.js

const { validationResult } = require("express-validator");
const Reservation = require("../models/Reservation");

// Get all reservations (Admin)
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new reservation (User)
exports.createReservation = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, phone, date } = req.body;
    const reservation = new Reservation({ name, email, phone, date });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a reservation (Admin)
exports.updateReservation = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name, email, phone, date } = req.body;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { name, email, phone, date },
      { new: true }
    );
    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(updatedReservation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a reservation (Admin)
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(deletedReservation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
