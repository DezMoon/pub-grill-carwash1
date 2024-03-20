// server/controllers/menuItems.js

const MenuItem = require("../models/MenuItem");

// Controller function to get all menuItems
exports.getAllReservations = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller function to create a new menuItem
exports.createReservation = async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid Request" });
  }
};

// Controller function to update a menuItem
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMenuItem) {
      return res.status(404).json({ message: "MenuItem not found" });
    }
    res.json(updatedMenuItem);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid Request" });
  }
};

// Controller function to delete a menuItem
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedMenuItem) {
      return res.status(404).json({ message: "MenuItem not found" });
    }
    res.json(deletedMenuItem);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid Request" });
  }
};
