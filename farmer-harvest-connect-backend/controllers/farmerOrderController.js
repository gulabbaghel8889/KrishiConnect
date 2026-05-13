const Purchase = require("../models/Purchase");
const asyncHandler = require("express-async-handler");

/* GET ALL INCOMING PURCHASE REQUESTS FOR FARMER */
exports.getPurchaseRequests = asyncHandler(async (req, res) => {
  const requests = await Purchase.find({
    farmerId: req.user._id,
  })
    .populate('buyerId', 'name phone email')
    .populate('listingId', 'cropName image price')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    requests,
  });
});

/* UPDATE REQUEST STATUS */
exports.updateRequestStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const request = await Purchase.findById(req.params.id);

  if (!request) {
    return res.status(404).json({
      success: false,
      message: "Request not found",
    });
  }

  // Ensure this farmer owns the listing
  if (request.farmerId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized",
    });
  }

  request.paymentStatus = status === 'accepted' ? 'verified' : 'disputed'; 
  // Map 'accepted' to 'verified' for now, or just use status directly if we update schema
  // Actually, let's keep it simple for now or map it to something relevant.
  // In our Purchase model we have: pending, receipt-uploaded, verified, disputed, completed
  
  if (status === 'accepted') request.paymentStatus = 'verified';
  if (status === 'rejected') request.paymentStatus = 'disputed';

  await request.save();

  res.json({
    success: true,
    request,
  });
});