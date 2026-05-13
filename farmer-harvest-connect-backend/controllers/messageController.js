const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  try {
    const {
      senderId,
      receiverId,
      senderRole,
      message,
    } = req.body;

    const newMessage = await Message.create({
      senderId,
      receiverId,
      senderRole,
      message,
    });

    res.json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { user1, user2 } = req.query;

    const messages = await Message.find({
      $or: [
        {
          senderId: user1,
          receiverId: user2,
        },
        {
          senderId: user2,
          receiverId: user1,
        },
      ],
    }).sort({ createdAt: 1 });

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};