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
// delete a restaurant
router.delete("/:restaurantId", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);

    if (!restaurant.owner.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedRes = await Restaurant.findByIdAndDelete(
      req.params.restaurantId
    );
    res.status(200).json(deletedRes);
  } catch (error) {
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
// add Rating
router.post("/:restaurantId/rating", async (req, res) => {
  try {
    req.body.userId = req.user._id;
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    restaurant.rating.push(req.body);
    await restaurant.save();

    // Find the newly created comment:
    const newRating = restaurant.rating[restaurant.rating.length - 1];

    res.status(201).json(newRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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

// view all booking for res owners
router.get("/:restaurantId/Booking", async (req, res) => {
  try {
    //find the restaurant
    const restaurant = await Restaurant.findById(req.params.restaurantId);

    if (!restaurant.owner.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const Book = await Booking.find({
      restaurantId: req.params.restaurantId,
    })
      .populate("userId")
      .sort({
        createdAt: "desc",
      });

    res.status(201).json(Book);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
