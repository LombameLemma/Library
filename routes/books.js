const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const jwt = require("jsonwebtoken");

// Middleware to check admin
const verifyAdmin = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ error: "Access denied" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified.role !== "admin") return res.status(403).json({ error: "Admin access only" });

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// Add book (admin only)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { title, author, totalCopies } = req.body;
    const newBook = new Book({ title, author, totalCopies, availableCopies: totalCopies });
    await newBook.save();
    res.json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;