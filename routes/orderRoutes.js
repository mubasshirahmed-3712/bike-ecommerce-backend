// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order"); // Import Order model
// const  protect  = require("../middleware/authMiddleware");
// const sendOrderConfirmationEmail = require("../utils/sendEmail"); // Import email function

// // ✅ Place Order & Send Email
// router.post("/place", protect, async (req, res) => {
//   try {
//     const { items, totalPrice } = req.body;
//     const userId = req.user._id;
//     const userEmail = req.user.email;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No items in the order." });
//     }

//     // ✅ Save order in database
//     const newOrder = new Order({
//       user: userId,
//       items,
//       totalPrice,
//     });

//     const savedOrder = await newOrder.save();

//     // ✅ Send order confirmation email
//     await sendOrderConfirmationEmail(userEmail, savedOrder);

//     res.status(201).json({ message: "Order placed successfully!", order: savedOrder });
//   } catch (error) {
//     console.error("Order Error:", error);
//     res.status(500).json({ message: "Failed to place order" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Import Order model
const protect = require("../middleware/authMiddleware");
const sendOrderConfirmationEmail = require("../utils/sendEmail"); // Import email function

// ✅ Place Order & Send Email
router.post("/place", protect, async (req, res) => {
  try {
    const { userDetails, cart, totalPrice } = req.body;
    const userId = req.user._id;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "No items in the order." });
    }

    // ✅ Save order in database
    const newOrder = new Order({
      user: userId,
      items: cart,
      totalPrice,
      shippingDetails: userDetails,
    });

    const savedOrder = await newOrder.save();

    // ✅ Send order confirmation email
    await sendOrderConfirmationEmail(userDetails, cart, totalPrice);

    res.status(201).json({ message: "Order placed successfully!", order: savedOrder });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
});

module.exports = router;
