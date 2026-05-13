const PurchaseRequest = require("../models/PurchaseRequest");

exports.getPurchaseRequests = async (req, res) => {
  try {
    const requests = await PurchaseRequest.find({
      farmerId: "6a042304bda97b782fe02b70",
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const request = await PurchaseRequest.findById(
      req.params.id
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    request.status = req.body.status;

    await request.save();

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
};