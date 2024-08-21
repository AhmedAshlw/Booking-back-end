const mongoose = require("mongoose");

const User = require("../models/user");

const ratingSchema = new mongoose.Schema({
  rate: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

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
  comments: [commentSchema],
  resimage: {
    type:String,
    required: false,
  },
});

const Restaurant = mongoose.model("restaurant", restaurantSchema);

module.exports = Restaurant;
