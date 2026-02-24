import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await API.get("/books");
    setBooks(res.data);
  };

  const addBook = async () => {
    await API.post("/books", { title });
    setTitle("");
    fetchBooks();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <input type="text" placeholder="Book title" value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addBook}>Add Book</button>

      <h3>All Books</h3>
      <ul>
        {books.map(book => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;