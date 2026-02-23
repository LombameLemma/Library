const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  borrowDate: { type: Date, default: Date.now },
  dueDate: { type: Date },
  returnDate: { type: Date, default: null }
});

module.exports = mongoose.model("Borrow", BorrowSchema);