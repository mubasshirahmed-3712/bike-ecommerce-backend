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

// ✅ Get Order History
router.get("/history", protect, async (req, res) => {
  try {
    const userId = req.user._id; // Get logged-in user's ID
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }); // Fetch orders

    res.status(200).json(orders); // Send orders as JSON response
  } catch (error) {
    console.error("Fetch Order History Error:", error);
    res.status(500).json({ message: "Failed to fetch order history" });
  }
});

module.exports = router;
