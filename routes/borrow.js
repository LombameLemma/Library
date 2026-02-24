const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

// Borrow Book
router.post("/borrow/:bookId", auth, async (req, res) => {
  const book = await Book.findById(req.params.bookId);
  if (!book || book.availableCopies < 1) {
    return res.status(400).json({ message: "Book not available" });
  }

  book.availableCopies -= 1;
  await book.save();

  const borrow = new Borrow({
    user: req.user.id,
    book: book._id,
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  });

  await borrow.save();
  res.json({ message: "Book borrowed successfully", borrow });
});

// Return Book
router.post("/return/:borrowId", auth, async (req, res) => {
  const borrow = await Borrow.findById(req.params.borrowId);
  if (!borrow || borrow.returnDate) {
    return res.status(400).json({ message: "Invalid borrow record" });
  }

  borrow.returnDate = new Date();
  await borrow.save();

  const book = await Book.findById(borrow.book);
  book.availableCopies += 1;
  await book.save();

  res.json({ message: "Book returned successfully" });
});

module.exports = router;