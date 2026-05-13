const asyncHandler = require('express-async-handler');
const TreeRequest = require('../models/TreeRequest');
const Tree = require('../models/Tree');
const { success, error, notFound } = require('../utils/response');

/** POST /api/tree-requests - Submit a new tree purchase request */
const createTreeRequest = asyncHandler(async (req, res) => {
  const { treeId, quantity, fullName, phone, shippingAddress } = req.body;

  const tree = await Tree.findById(treeId);
  if (!tree) return notFound(res, 'Tree not found');

  const totalPrice = tree.mrp * quantity;

  const request = await TreeRequest.create({
    tree: treeId,
    user: req.user._id,
    quantity,
    totalPrice,
    fullName,
    phone,
    shippingAddress,
  });

  return success(res, request, 'Tree purchase request submitted successfully', 201);
});

/** GET /api/tree-requests/my - Get user's own tree requests */
const getMyTreeRequests = asyncHandler(async (req, res) => {
  const requests = await TreeRequest.find({ user: req.user._id })
    .populate('tree', 'name image mrp')
    .sort({ createdAt: -1 });
  return success(res, requests, 'Your tree requests fetched successfully');
});

/** GET /api/admin/tree-requests - Admin view all requests */
const getAllTreeRequests = asyncHandler(async (req, res) => {
  const requests = await TreeRequest.find()
    .populate('tree', 'name image mrp')
    .populate('user', 'name email phone')
    .sort({ createdAt: -1 });
  return success(res, requests, 'All tree requests fetched successfully');
});

/** PATCH /api/admin/tree-requests/:id/status - Admin update request status */
const updateRequestStatus = asyncHandler(async (req, res) => {
  const { status, paymentStatus } = req.body;
  const request = await TreeRequest.findById(req.params.id);
  
  if (!request) return notFound(res, 'Request not found');

  if (status) request.status = status;
  if (paymentStatus) request.paymentStatus = paymentStatus;

  await request.save();
  return success(res, request, `Request updated to ${status || request.status}`);
});

module.exports = {
  createTreeRequest,
  getMyTreeRequests,
  getAllTreeRequests,
  updateRequestStatus,
};
