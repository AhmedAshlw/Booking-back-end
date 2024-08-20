const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rate: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  category: {
    type: String,
    required: true,
  },
  location: String,
  rating: [ratingSchema],
  operatingHours: String,
});

const Restaurant = mongoose.model("restaurant", restaurantSchema);

module.exports = Restaurant;
