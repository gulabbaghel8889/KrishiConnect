const Review = require("../models/Review");
const Purchase = require("../models/Purchase");
const asyncHandler = require("express-async-handler");

/* ADD REVIEW FOR A CROP */
exports.addReview = asyncHandler(async (req, res) => {
  const { cropId, purchaseId, rating, comment } = req.body;

  // Verify purchase exists and belongs to this buyer
  const purchase = await Purchase.findOne({
    _id: purchaseId,
    buyerId: req.user._id,
    listingId: cropId
  });

  if (!purchase) {
    return res.status(403).json({
      success: false,
      message: "You can only review crops you have purchased."
    });
  }

  const review = await Review.create({
    cropId,
    purchaseId,
    user: req.user._id,
    rating,
    comment,
  });

  res.status(201).json({
    success: true,
    message: "Review added successfully",
    review,
  });
});

/* GET REVIEWS FOR A CROP */
exports.getCropReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    cropId: req.params.cropId,
  }).populate("user", "name profile.avatar");

  res.status(200).json({
    success: true,
    reviews,
  });
});