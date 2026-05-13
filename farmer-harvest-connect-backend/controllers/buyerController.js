const asyncHandler = require('express-async-handler');
const CropListing = require('../models/CropListing');
const CropOffer = require('../models/CropOffer');
const Purchase = require('../models/Purchase');
const Notification = require('../models/Notification');

/* GET ALL ACTIVE CROP LISTINGS */
const getCropListings = asyncHandler(async (req, res) => {
  const listings = await CropListing.find({
    status: 'active',
  })
    .populate('farmerId', 'name phone profile')
    .sort({ createdAt: -1 });

  res.status(200).json(listings);
});

/* GET SINGLE LISTING */
const getCropListingById = asyncHandler(async (req, res) => {
  const listing = await CropListing.findById(req.params.id)
    .populate('farmerId', 'name phone profile');

  if (!listing) {
    return res.status(404).json({
      message: 'Listing not found',
    });
  }

  res.status(200).json(listing);
});

/* BUYER MAKES OFFER */
const makeOffer = asyncHandler(async (req, res) => {
  const { listingId, offerPrice, quantity, message } = req.body;

  const listing = await CropListing.findById(listingId);

  if (!listing) {
    return res.status(404).json({
      message: 'Crop listing not found',
    });
  }

  const offer = await CropOffer.create({
    buyerId: req.user._id,
    farmerId: listing.farmerId,
    listingId,
    offerPrice,
    quantity,
    message,
  });

  res.status(201).json(offer);
});

/* BUYER OFFERS */
const getMyOffers = asyncHandler(async (req, res) => {
  const offers = await CropOffer.find({
    buyerId: req.user._id,
  })
    .populate('listingId')
    .populate('farmerId', 'name phone')
    .sort({ createdAt: -1 });

  res.json(offers);
});

/* PURCHASE */
const initiatePurchase = asyncHandler(async (req, res) => {
  const {
    offerId,
    paymentMethod,
    transactionId,
    notes,
  } = req.body;

  const offer = await CropOffer.findOne({
    _id: offerId,
    buyerId: req.user._id,
    status: 'accepted',
  }).populate('listingId');

  if (!offer) {
    return res.status(404).json({
      message: 'Accepted offer not found',
    });
  }

  const exists = await Purchase.findOne({
    buyerId: req.user._id,
    listingId: offer.listingId._id,
  });

  if (exists) {
    return res.status(400).json({
      message: 'Purchase already exists',
    });
  }

  const totalAmount =
    offer.offerPrice * offer.quantity.amount;

  const purchase = await Purchase.create({
    buyerId: req.user._id,
    farmerId: offer.farmerId,
    listingId: offer.listingId._id,
    offerId: offer._id,
    quantity: offer.quantity,
    agreedPrice: offer.offerPrice,
    totalAmount,
    paymentMethod,
    transactionId,
    notes,
  });

  await Notification.create({
    user: offer.farmerId,
    title: 'New Purchase Request',
    message: `${req.user.name} initiated purchase for ${offer.listingId.cropName}`,
  });

  res.status(201).json(purchase);
});

/* UPLOAD RECEIPT */
const uploadReceipt = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: 'Receipt required',
    });
  }

  const purchase = await Purchase.findOne({
    _id: req.params.purchaseId,
    buyerId: req.user._id,
  });

  if (!purchase) {
    return res.status(404).json({
      message: 'Purchase not found',
    });
  }

  purchase.receipt = {
    fileName: req.file.filename,
    filePath: req.file.path,
    uploadedAt: new Date(),
  };

  purchase.paymentStatus = 'receipt-uploaded';

  await purchase.save();

  res.json(purchase);
});

/* ORDERS */
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Purchase.find({
    buyerId: req.user._id,
  })
    .populate('listingId')
    .populate('farmerId', 'name phone')
    .sort({ createdAt: -1 });

  res.json(orders);
});

/* SINGLE ORDER */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Purchase.findOne({
    _id: req.params.id,
    buyerId: req.user._id,
  })
    .populate('listingId')
    .populate('farmerId', 'name phone profile');

  if (!order) {
    return res.status(404).json({
      message: 'Order not found',
    });
  }

  res.json(order);
});

/* DIRECT PURCHASE FROM LISTING */
const directPurchase = asyncHandler(async (req, res) => {
  const {
    listingId,
    quantityAmount,
    notes,
  } = req.body;

  const listing = await CropListing.findById(listingId);
  if (!listing) return notFound(res, 'Listing not found');
  if (listing.status !== 'active') return badRequest(res, 'Listing is not active');

  const totalAmount = listing.price.amount * quantityAmount;

  const purchase = await Purchase.create({
    buyerId:    req.user._id,
    farmerId:   listing.farmerId,
    listingId:  listing._id,
    quantity: {
      amount: quantityAmount,
      unit:   listing.quantity.unit
    },
    agreedPrice: listing.price.amount,
    totalAmount,
    notes,
    paymentStatus: 'pending',
  });

  await Notification.create({
    user: listing.farmerId,
    title: 'New Order Received!',
    message: `${req.user.name} placed an order for ${quantityAmount} ${listing.quantity.unit} of ${listing.cropName}.`,
  });

  res.status(201).json(purchase);
});

module.exports = {
  getCropListings,
  getCropListingById,
  makeOffer,
  getMyOffers,
  initiatePurchase,
  uploadReceipt,
  getMyOrders,
  getOrderById,
  directPurchase,
};