const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const Restaurant = require("../models/restaurant");
const Booking = require("../models/Booking");

// protected Routes
router.use(verifyToken);
// route for creating a restaurant
router.post("/", async (req, res) => {
  try {
    req.body.owner = req.user._id;
    const restaurant = await Restaurant.create(req.body);

    res.status(201).json(restaurant);
  } catch (error) {
    //console.log(error);
    res.status(500).json(error);
  }
});
// update restaurant
router.put("/:restaurantId", async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.restaurantId,
      req.body,
      { new: true }
    );

    res.status(201).json(restaurant);
  } catch (error) {
    //console.log(error);
    res.status(500).json(error);
  }
});

//show specific restaurant
router.get("/:restaurantId", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);

    res.status(201).json(restaurant);
  } catch (error) {
    //console.log(error);
    res.status(500).json(error);
  }
});

//view all restaurant
router.get("/", async (req, res) => {
  try {
    const restaurant = await Restaurant.find({})
      .populate("owner")
      .sort({ createdAt: "desc" });
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json(error);
  }
});

// add Booking
router.post("/:restaurantId/Booking", async (req, res) => {
  try {
    req.body.userId = req.user._id;
    req.body.restaurantId = req.params.restaurantId;
    const Book = await Booking.create(req.body);
    res.status(201).json(Book);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//view tables
router.get("/:restaurantId/tables", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    req.body.userId = req.user._id;
    const tables = restaurant.tables;
    res.status(201).json(tables);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
