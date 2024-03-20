// src/components/AppointmentManagement.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/api/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <div>
      <h2>Appointment Management</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            {appointment.name} - {appointment.date}
            {/* Add more appointment details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentManagement;
