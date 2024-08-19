const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const Booking = require("../models/Booking");

// protected Routes
router.use(verifyToken);
// route for viewing user Bookings

module.exports = router;
