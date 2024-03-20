// server/controllers/menu.js

const { validationResult } = require("express-validator");
const MenuItem = require("../models/MenuItem");

// Get all menu items (Admin)
exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new menu item (Admin)
exports.createMenuItem = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, description, price } = req.body;
    const imagePath = req.file ? req.file.path : null;
    const menuItem = new MenuItem({
      name,
      description,
      price,
      image: imagePath,
    });
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a menu item (Admin)
exports.updateMenuItem = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const imagePath = req.file ? req.file.path : null;
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, description, price, image: imagePath },
      { new: true }
    );
    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json(updatedMenuItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a menu item (Admin)
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json(deletedMenuItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
