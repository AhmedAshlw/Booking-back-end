const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const Restaurant = require("../models/restaurant");
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
// add Tables

router.post("/:restaurantId", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);

    const table = restaurant.tables.push(req.body);
    await restaurant.save();
    res.status(201).json(table);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = router;
