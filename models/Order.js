const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true }, // ✅ Added image field
      },
    ],
    totalPrice: { type: Number, required: true },
    shippingDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
