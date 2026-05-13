// const express = require("express");
// const router = express.Router();

// const {
//   createOrder,
//   getBuyerOrders,
//   getFarmerOrders,
//   updateOrderStatus,
// } = require("../controllers/orderController.js");

// const { protect } = require("../middleware/authMiddleware");

// router.post("/create", protect, createOrder);
// router.get("/buyer", protect, getBuyerOrders);
// router.get("/farmer", protect, getFarmerOrders);
// router.put("/status/:id", protect, updateOrderStatus);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  createOrder,
  getBuyerOrders,
  getFarmerOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

// Create order
router.post("/", protect, createOrder);

// Get logged-in buyer orders
router.get("/buyer", protect, getBuyerOrders);

// Get logged-in farmer orders
router.get("/farmer", protect, getFarmerOrders);

// Update order status
router.patch("/:id/status", protect, updateOrderStatus);

module.exports = router;