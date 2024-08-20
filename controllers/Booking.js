const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const Booking = require("../models/Booking");

// protected Routes
router.use(verifyToken);
// route for viewing user Bookings

router.get("/", async (req, res) => {
  try {
    const Bookings = await Booking.find({ userId: req.user._id })
      .populate("restaurantId")
      .sort({
        createdAt: "desc",
      });
    res.status(200).json(Bookings);
  } catch (error) {
    res.status(500).json(error);
  }
});
// route to show booking
router.get("/:bookingId", async (req, res) => {
  try {
    const Book = await Booking.findById(req.params.bookingId).populate(
      "restaurantId"
    );
    res.status(200).json(Book);
  } catch (error) {
    res.status(500).json(error);
  }
});
//update a booking
router.put("/:bookingId", async (req, res) => {
  try {
    const Book = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      req.body,
      { new: true }
    ).populate("restaurantId");
    res.status(200).json(Book);
  } catch (error) {
    res.status(500).json(error);
  }
});
//delete a booking
router.delete("/:bookingId", async (req, res) => {
  try {
    const book = await Booking.findById(req.params.bookingId);

    if (!book.userId.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const Book = await Booking.findByIdAndDelete(req.params.bookingId);
    res.status(200).json(Book);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
