import fs from 'fs';
const FILE_PATH = './data/books.json';

function readBooks() {
  try {
    if (!fs.existsSync(FILE_PATH)) return [];
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading books file:', err);
    return [];
  }
}

function writeBooks(books) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(books, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing books file:', err);
  }
}

export { readBooks, writeBooks };