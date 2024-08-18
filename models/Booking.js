const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: "table" },
  TypesableNumber: {
    type: Number,
    required: true,
  },
  date: Date,
  time: String,
  status: { type: String, enum: ["pending", "confirmed", "cancelled"] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
const Booking = mongoose.model("restaurant", BookingSchema);

module.exports = Booking;
