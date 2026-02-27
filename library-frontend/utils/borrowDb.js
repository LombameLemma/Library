import fs from 'fs';
const FILE_PATH = './data/borrows.json';

function readBorrows() {
  try {
    if (!fs.existsSync(FILE_PATH)) return [];
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading borrows file:', err);
    return [];
  }
}

function writeBorrows(borrows) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(borrows, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing borrows file:', err);
  }
}

export { readBorrows, writeBorrows };