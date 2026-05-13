const express = require("express");
const router = express.Router();

const {
  getPurchaseRequests,
  updateRequestStatus,
} = require("../controllers/farmerOrderController");

router.get("/", getPurchaseRequests);

router.put("/:id", updateRequestStatus);

module.exports = router;