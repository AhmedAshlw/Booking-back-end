const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  Seats: {
    type: Number,
    required: true,
  },
  TableNumber: {
    type: Number,
    required: true,
  },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: [Number],

  category: {
    type: String,
    required: true,
  },
  location: String,
  tables: [tableSchema],
  operatingHours: String,
});

// models/hoot.js

const Restaurant = mongoose.model("restaurant", restaurantSchema);

module.exports = Restaurant;
