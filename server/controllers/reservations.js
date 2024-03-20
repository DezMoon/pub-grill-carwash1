// server/controllers/reservations.js

const Reservation = require("../models/Reservation");
const { validationResult } = require("express-validator");

// Controller function to get all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller function to create a new reservation
exports.createReservation = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller function to update a reservation
exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(updatedReservation);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid Request" });
  }
};

// Controller function to delete a reservation
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
    res.status(400).json({ message: "Invalid Request" });
  }
};
