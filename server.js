require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");



const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "https://bike-estore.vercel.app", credentials: true })); // Adjust frontend URL if needed

// Connect to MongoDB
connectDB();

// Serve static images from the "public/images" folder
app.use("/images", express.static(path.join(__dirname, "public/images")));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);


// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
