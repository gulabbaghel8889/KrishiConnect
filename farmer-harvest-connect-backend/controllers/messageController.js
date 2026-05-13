const Message = require("../models/Message");
const asyncHandler = require("express-async-handler");

/* SEND MESSAGE */
exports.sendMessage = asyncHandler(async (req, res) => {
  const {
    receiverId,
    cropId,
    message,
  } = req.body;

  const newMessage = await Message.create({
    senderId: req.user._id,
    receiverId,
    senderRole: req.user.role,
    cropId,
    message,
  });

  res.status(201).json({
    success: true,
    message: newMessage,
  });
});

/* GET MESSAGES FOR A CONVERSATION */
exports.getMessages = asyncHandler(async (req, res) => {
  const { otherUserId, cropId } = req.query;

  if (!otherUserId || !cropId) {
    return res.status(400).json({
      success: false,
      message: "otherUserId and cropId are required"
    });
  }

  const messages = await Message.find({
    cropId,
    $or: [
      { senderId: req.user._id, receiverId: otherUserId },
      { senderId: otherUserId, receiverId: req.user._id },
    ],
  }).sort({ createdAt: 1 });

  res.json({
    success: true,
    messages,
  });
});