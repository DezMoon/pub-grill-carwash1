// src/components/ReservationManagement.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get("/api/reservations");
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  return (
    <div>
      <h2>Reservation Management</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation._id}>
            {reservation.name} - {reservation.date}
            {/* Add more reservation details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationManagement;
