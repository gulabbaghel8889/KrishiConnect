const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    senderRole: {
      type: String,
      enum: ["buyer", "farmer"],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
    cropId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CropListing',
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);