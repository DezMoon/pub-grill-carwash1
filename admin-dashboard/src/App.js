// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import ReservationManagement from "./components/ReservationManagement";
import AppointmentManagement from "./components/AppointmentManagement";
import MenuItemManagement from "./components/MenuItemManagement";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin" component={AdminDashboard} />
        <Route path="/admin/reservations" component={ReservationManagement} />
        <Route path="/admin/appointments" component={AppointmentManagement} />
        <Route path="/admin/menu" component={MenuItemManagement} />
      </Switch>
    </Router>
  );
}

export default App;
