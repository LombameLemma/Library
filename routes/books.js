const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Book = require("../models/Book");
const User = require("../models/User");

// Add Book (Admin Only)
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }

  const { title, author, totalCopies } = req.body;

  const book = new Book({
    title,
    author,
    totalCopies,
    availableCopies: totalCopies
  });

  await book.save();
  res.json({ message: "Book added successfully", book });
});

// Get All Books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

module.exports = router;