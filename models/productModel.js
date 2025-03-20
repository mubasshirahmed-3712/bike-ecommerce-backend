const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    engineCapacity: { type: String, required: true, trim: true }, // Stores values with units (e.g., "650cc")
    engineType: { type: String, required: true, trim: true },
    horsepower: { type: String, required: true, trim: true }, // Stores values with units (e.g., "47 hp")
    torque: { type: String, required: true, trim: true }, // Stores values with units (e.g., "52 Nm")
    weight: { type: String, required: true, trim: true }, // Stores values with units (e.g., "190 kg")
    topSpeed: { type: String, required: true, trim: true }, // Stores values with units (e.g., "180 km/h")
    fuelCapacity: { type: String, required: true, trim: true }, // Stores values with units (e.g., "15 L")
    mileage: { type: String, required: true, trim: true }, // Stores values with units (e.g., "25 km/l")
    transmission: { type: String, required: true, trim: true },
    brakingSystem: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 }, // Price should always be non-negative
    quantity: { type: Number, required: true, min: 0, default: 0 }, // Ensures no negative stock values
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
