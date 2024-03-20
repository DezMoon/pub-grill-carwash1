// server/routes/reservations.js

const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

// Get all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Create a new reservation
router.post("/", async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid Request" });
  }
});

// Update a reservation
router.put("/:id", async (req, res) => {
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
});

// Delete a reservation
router.delete("/:id", async (req, res) => {
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
});

module.exports = router;
