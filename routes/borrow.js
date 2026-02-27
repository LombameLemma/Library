const express = require("express");
const router = express.Router();
const Borrow = require("../models/Borrow");
const Book = require("../models/Book");
const jwt = require("jsonwebtoken");

// Middleware to verify user
const verifyUser = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ error: "Access denied" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// Borrow a book
router.post("/:bookId", verifyUser, async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });
    if (book.availableCopies < 1) return res.status(400).json({ error: "No copies available" });

    const borrow = new Borrow({
      user: req.user.id,
      book: book._id,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks
    });
    await borrow.save();

    book.availableCopies -= 1;
    await book.save();

    res.json({ message: "Book borrowed successfully", borrow });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Return a book
router.post("/return/:borrowId", verifyUser, async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.borrowId);
    if (!borrow) return res.status(404).json({ error: "Borrow record not found" });
    if (borrow.returnDate) return res.status(400).json({ error: "Book already returned" });

    borrow.returnDate = new Date();
    await borrow.save();

    const book = await Book.findById(borrow.book);
    book.availableCopies += 1;
    await book.save();

    res.json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;