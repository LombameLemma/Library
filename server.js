// 1️⃣ Import dependencies
//
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 2️⃣ Create app
const app = express();

// 3️⃣ Middlewares
app.use(cors());
app.use(express.json());

// 4️⃣ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// 5️⃣ Import Routes
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const borrowRoutes = require("./routes/borrow");

// 6️⃣ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

// 7️⃣ Test Route
app.get("/", (req, res) => {
  res.json({ message: "📚 Library API is running" });
});

// 8️⃣ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
