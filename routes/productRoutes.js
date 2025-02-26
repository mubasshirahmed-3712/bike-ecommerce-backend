const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔥 Decrease product quantity when added to cart
router.put("/:id/decrease", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity && product.quantity > 0) {
      product.quantity -= 1; // Reduce quantity
      await product.save();
      return res.json({ message: "Product quantity updated", quantity: product.quantity });
    } else {
      return res.status(400).json({ message: "Product is out of stock" });
    }
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔄 Increase product quantity when removed from cart
router.put("/:id/increase", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (typeof product.quantity === "number") {
      product.quantity += 1; // Increase stock
      await product.save();
      return res.json({ message: "Stock updated successfully", quantity: product.quantity });
    } else {
      return res.status(400).json({ message: "Invalid product quantity value" });
    }
  } catch (error) {
    console.error("Error increasing quantity:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
