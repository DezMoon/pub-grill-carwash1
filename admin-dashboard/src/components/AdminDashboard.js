// src/components/AdminDashboard.js

import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/reservations">Reservations</Link>
          </li>
          <li>
            <Link to="/admin/appointments">Appointments</Link>
          </li>
          <li>
            <Link to="/admin/menu">Menu Items</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
