const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth");
const {
  addReview,
  getCropReviews,
} = require("../controllers/reviewController");

router.post("/add", protect, addReview);

router.get("/:cropId", getCropReviews);

module.exports = router;