// const express = require("express");

// const router = express.Router();

// const {
//   getNotifications,
//   markAsRead,
// } = require("../controllers/notificationController");

// const { protect } = require("../middleware/authMiddleware");

// router.get("/", protect, getNotifications);

// router.put("/read/:id", protect, markAsRead);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");
const PurchaseRequest = require("../models/PurchaseRequest");
router.get("/", getNotifications);

router.put("/read/:id", markAsRead);

module.exports = router;


// router.post("/test-buy", async (req, res) => {
//   const Notification = require("../models/Notification");

//   const { farmerId, cropName } = req.body;

//   await Notification.create({
//     user: farmerId,
//     title: "New Purchase Request",
//     message: `Buyer wants to buy ${cropName}`,
//   });

//   res.json({
//     success: true,
//   });
// });
router.post("/test-buy", async (req, res) => {
  try {
    const Notification = require("../models/Notification");

    const {
      farmerId,
      cropName,
      cropId,
      buyerName,
      buyerPhone,
    } = req.body;

    const request = await PurchaseRequest.create({
      buyerName,
      buyerPhone,
      farmerId,
      cropId,
      cropName,
      quantity: 1,
    });

    await Notification.create({
      user: farmerId,
      title: "New Purchase Request",
      message: `Buyer wants to buy ${cropName}`,
    });

    res.json({
      success: true,
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});