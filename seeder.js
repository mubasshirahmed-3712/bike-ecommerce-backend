require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const products = require("./data/bikesData");
const connectDB = require("./config/db");

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear previous data
    await Product.insertMany(products);
    console.log("Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();

