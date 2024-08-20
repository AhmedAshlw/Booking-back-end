const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "restaurant" },
  seats: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
