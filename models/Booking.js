const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: "table" },
  TypesableNumber: {
    type: Number,
    required: true,
  },
  date: Date,
  time: String,

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
const Booking = mongoose.model("restaurant", BookingSchema);

module.exports = Booking;
