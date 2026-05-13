const mongoose = require("mongoose");

const purchaseRequestSchema = new mongoose.Schema(
  {
    buyerName: {
      type: String,
      required: true,
    },

    buyerPhone: {
      type: String,
    },

    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cropId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CropListing",
      required: true,
    },

    cropName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PurchaseRequest",
  purchaseRequestSchema
);