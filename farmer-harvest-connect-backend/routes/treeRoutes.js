const express = require('express');
const router = express.Router();
const Tree = require('../models/Tree');
const { protect } = require('../middlewares/auth');
const asyncHandler = require('express-async-handler');
const { success } = require('../utils/response');

const { createTreeRequest, getMyTreeRequests } = require('../controllers/treeRequestController');

/** GET /api/trees - Public (Authenticated) fetch all trees */
router.get('/', protect, asyncHandler(async (req, res) => {
  const trees = await Tree.find().sort({ createdAt: -1 });
  return success(res, trees, 'Trees fetched successfully');
}));

/** POST /api/trees/request - Submit a purchase request */
router.post('/request', protect, createTreeRequest);

/** GET /api/trees/my-requests - View user's own requests */
router.get('/my-requests', protect, getMyTreeRequests);

module.exports = router;
