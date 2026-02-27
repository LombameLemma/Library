import { readBooks, writeBooks } from '../utils/booksDb.js';
import { v4 as uuidv4 } from 'uuid';

export const addBook = (req, res) => {
  const books = readBooks();

  const newBook = {
    id: uuidv4(),
    title: req.body.title,
    author: req.body.author,
    available: true
  };

  books.push(newBook);
  writeBooks(books);

  res.json(newBook);
};