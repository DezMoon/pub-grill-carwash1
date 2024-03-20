// server/routes/menuItems.js

const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// Get all menuItems
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Create a new menuItem
router.post("/", async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid Request" });
  }
});

// Update a menuItem
router.put("/:id", async (req, res) => {
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
});

// Delete a menuItem
router.delete("/:id", async (req, res) => {
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
});

module.exports = router;
