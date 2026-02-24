import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig";

function StudentDashboard() {
  const [books, setBooks] = useState([]);
  const [borrowHistory, setBorrowHistory] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchBorrowHistory();
  }, []);

  const fetchBooks = async () => {
    const res = await API.get("/books");
    setBooks(res.data);
  };

  const fetchBorrowHistory = async () => {
    const res = await API.get("/borrow/history");
    setBorrowHistory(res.data);
  };

  const borrowBook = async (bookId) => {
    await API.post("/borrow", { bookId });
    fetchBorrowHistory();
  };

  const returnBook = async (borrowId) => {
    await API.post("/borrow/return", { borrowId });
    fetchBorrowHistory();
  };

  return (
    <div>
      <h2>Student Dashboard</h2>

      <h3>Available Books</h3>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} <button onClick={() => borrowBook(book._id)}>Borrow</button>
          </li>
        ))}
      </ul>

      <h3>Borrow History</h3>
      <ul>
        {borrowHistory.map(b => (
          <li key={b._id}>
            {b.bookTitle} - {b.returned ? "Returned" : "Borrowed"}
            {!b.returned && <button onClick={() => returnBook(b._id)}>Return</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDashboard;