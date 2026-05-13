// // const Notification = require("../models/Notification");

// // exports.getNotifications = async (req, res) => {
// //   try {
// //     const notifications = await Notification.find({
// //       user: req.user.id,
// //     }).sort({ createdAt: -1 });

// //     res.status(200).json({
// //       success: true,
// //       notifications,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // exports.markAsRead = async (req, res) => {
// //   try {
// //     const notification =
// //       await Notification.findByIdAndUpdate(
// //         req.params.id,
// //         { isRead: true },
// //         { new: true }
// //       );

// //     res.status(200).json({
// //       success: true,
// //       notification,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // exports.createNotification = async ({
// //   user,
// //   title,
// //   message,
// // }) => {
// //   await Notification.create({
// //     user,
// //     title,
// //     message,
// //   });
// // };

// const Notification = require("../models/Notification");

// exports.getNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find({
//       user: req.user.id,
//     }).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       notifications,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// exports.markAsRead = async (req, res) => {
//   try {
//     const notification = await Notification.findOne({
//       _id: req.params.id,
//       // user: req.user.id,
//       user: "6a042304bda97b782fe02b70"
//     });

//     if (!notification) {
//       return res.status(404).json({
//         success: false,
//         message: "Notification not found",
//       });
//     }

//     notification.isRead = true;

//     await notification.save();

//     res.status(200).json({
//       success: true,
//       notification,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// exports.createNotification = async ({
//   user,
//   title,
//   message,
// }) => {
//   await Notification.create({
//     user,
//     title,
//     message,
//   });
// };

const Notification = require("../models/Notification");

/* GET NOTIFICATIONS */
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: "6a042304bda97b782fe02b70",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* MARK AS READ */
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      user: "6a042304bda97b782fe02b70",
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* CREATE NOTIFICATION */
exports.createNotification = async ({
  user,
  title,
  message,
}) => {
  await Notification.create({
    user,
    title,
    message,
  });
};