const { read } = require("fs");
const path = require("path");
const fs = require("fs").promises;

// Define file paths
const bookDir = path.join(__dirname, "..", "data");
const dataPath = path.join(bookDir, "books.json");

const readFile = async () => {
  const booksData = await fs.readFile(dataPath, "utf-8");
  if (!booksData.trim()) {
    await fs.writeFile(dataPath, [], 'utf-8');
    return [];
  }
  return JSON.parse(booksData);
};

async function writeFile(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf8");
}

async function deleteBook(id) {
  const books = await readFile();
  const filtered = books.filter(book => book.id !== id);
  
  if(books.length === filtered.length) return { success: false};
  await writeFile(filtered);
  return { success: true };
}
//! const id = Object.keys(book)[0];



module.exports = { readFile, writeFile, deleteBook };
