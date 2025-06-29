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
      id: uuid4(), // Use a unique id instead of hardcoded 2
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
  if(!id) return res.status(400).json({ message: 'Book ID is required' });

  try {
    const result = await deleteBook(id);
    if(!result.success) {
      return res.status(404).json({ message: `No book found with id ${id}`});
    }
    res.status(201).json({ message: `Item id: ${id} has been deleted successfully`});
  } catch (err) {
    console.error("Something went wrong: ", err);
    next(err);
  }
};

module.exports = { getBooks, addBook, deleteBookId };
