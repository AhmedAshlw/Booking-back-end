const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "restaurant" },

  date: Date,
  time: String,

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
