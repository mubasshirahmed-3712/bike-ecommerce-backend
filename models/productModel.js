const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true }, // ✅ Added brand
  category: { type: String, required: true }, // ✅ Added category
  engineCapacity: { type: Number, required: true }, // ✅ Added engine capacity
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
