// server/models/Reservation.js

const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  // Define schema fields for reservation
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
