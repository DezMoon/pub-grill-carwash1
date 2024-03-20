// server/models/MenuItem.js

const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  // Define schema fields for menu item
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;
