const express = require("express");
const router = express.Router();

const {
  getPurchaseRequests,
  updateRequestStatus,
} = require("../controllers/farmerOrderController");

const { protect } = require("../middlewares/auth");
const { authorize } = require("../middlewares/role");

router.get("/", protect, authorize('farmer'), getPurchaseRequests);

router.put("/:id", protect, authorize('farmer'), updateRequestStatus);

module.exports = router;