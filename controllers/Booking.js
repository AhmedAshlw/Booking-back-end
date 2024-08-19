const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const Booking = require("../models/Booking");

// protected Routes
router.use(verifyToken);
// route for viewing user Bookings
router.get("/", async (req, res) => {
  try {
    const Bookings = await Booking.find({ userId: req.user._id }).sort({
      createdAt: "desc",
    });
    res.status(200).json(Bookings);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
