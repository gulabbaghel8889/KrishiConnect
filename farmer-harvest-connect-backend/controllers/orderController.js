// const Order = require("../models/Order");

// exports.createOrder = async (req, res) => {
//   try {
//     const {
//       farmer,
//       items,
//       totalAmount,
//       shippingAddress,
//       paymentMethod,
//     } = req.body;

//     const order = await Order.create({
//       buyer: req.user.id,
//       farmer,
//       items,
//       totalAmount,
//       shippingAddress,
//       paymentMethod,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// exports.getBuyerOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ buyer: req.user.id })
//       .populate("farmer", "name email")
//       .populate("items.product");

//     res.status(200).json({
//       success: true,
//       orders,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// exports.getFarmerOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ farmer: req.user.id })
//       .populate("buyer", "name email")
//       .populate("items.product");

//     res.status(200).json({
//       success: true,
//       orders,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus: status },
//       { new: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Order status updated",
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// const {
//   createNotification,
// } = require("./notificationController");

// await createNotification({
//   user: farmer,
//   title: "New Order Received",
//   message:
//     "A customer has placed a new order.",
// });

const mongoose = require("mongoose");
const Order = require("../models/Order.js");
// const Product = require("../models/Product.js");
const { createNotification } = require("./notificationController.js");

const VALID_ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.createOrder = async (req, res) => {
  try {
    const {
      farmer,
      items,
      shippingAddress,
      paymentMethod,
    } = req.body;

    // Validate user
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // Validate required fields
    if (!farmer || !items || !shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // Validate IDs
    if (!isValidObjectId(farmer)) {
      return res.status(400).json({
        success: false,
        message: "Invalid farmer ID",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    // Buyer cannot order from self
    if (req.user.id === farmer) {
      return res.status(400).json({
        success: false,
        message: "You cannot place an order with yourself",
      });
    }

    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      if (!item.product || !item.quantity) {
        return res.status(400).json({
          success: false,
          message: "Each item must contain product and quantity",
        });
      }

      if (!isValidObjectId(item.product)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      if (item.quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Quantity must be greater than 0",
        });
      }

      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Optional farmer-product ownership check
      if (product.farmer.toString() !== farmer) {
        return res.status(400).json({
          success: false,
          message: "Product does not belong to selected farmer",
        });
      }

      // Stock check
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }

      totalAmount += product.price * item.quantity;

      validatedItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await Order.create({
      buyer: req.user.id,
      farmer,
      items: validatedItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      orderStatus: "Pending",
    });

    // Notification
    await createNotification({
      user: farmer,
      title: "New Order Received",
      message: "A customer has placed a new order.",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getBuyerOrders = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const orders = await Order.find({ buyer: req.user.id })
      .populate("farmer", "name email")
      .populate("items.product");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error("Get Buyer Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getFarmerOrders = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const orders = await Order.find({ farmer: req.user.id })
      .populate("buyer", "name email")
      .populate("items.product");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error("Get Farmer Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    if (!VALID_ORDER_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only farmer can update
    if (order.farmer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You cannot update this order",
      });
    }

    // Prevent delivered/cancelled modification
    if (
      order.orderStatus === "Delivered" ||
      order.orderStatus === "Cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: "Order can no longer be updated",
      });
    }

    order.orderStatus = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {
    console.error("Update Order Status Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};