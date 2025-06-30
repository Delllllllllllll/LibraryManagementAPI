const { readFile, writeFile, deleteBook } = require("../utils/fileHandler.js");
const { v4: uuid4 } = require("uuid");

const getBooks = async (req, res, next) => {
  try {
    const books = await readFile();
    res.json(books);
  } catch (err) {
    console.error("Something went wrong: ", err);
    next(err); // Pass the error to the centralized error handler
  }
};

const addBook = async (req, res, next) => {
  let oldBooks = await readFile();
  try {
    const newBook = {
      id: uuid4(), 
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: req.body.year,
    };

    oldBooks.push(newBook);
    await writeFile(oldBooks);
    res.status(201).json(newBook);
  } catch (err) {
    console.error("Something went wrong: ", err);
    next(err);
  }
};

const deleteBookId = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Book ID is required" });

  try {
    const result = await deleteBook(id);
    if (!result.success) {
      return res.status(404).json({ message: `No book found with id ${id}` });
    }
    res
      .status(201)
      .json({ message: `Item id: ${id} has been deleted successfully` });
  } catch (err) {
    console.error("Something went wrong: ", err);
    next(err);
  }
};

const updateBook = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const books = await readFile();
    const bookIndex = books.findIndex((book) => book.id === id);

    if (id === -1)
      return res.status(404).json({ message: `Book with id ${id} not found` });

    // This will overwrite the previous value and to the updated value 
    books[bookIndex] = {
      ...books[bookIndex],
      ...updates,
    };

    await writeFile(books); 
    res.status(200).json(books[bookIndex]);
  } catch (err) {
    console.error("Something went wrong: ", err);
    next(err);
  }
};

module.exports = { getBooks, addBook, deleteBookId, updateBook };
