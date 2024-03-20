// src/components/MenuItemManagement.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const MenuItemManagement = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("/api/menu");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  return (
    <div>
      <h2>Menu Item Management</h2>
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem._id}>
            {menuItem.name} - {menuItem.price}
            {/* Add more menu item details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItemManagement;
