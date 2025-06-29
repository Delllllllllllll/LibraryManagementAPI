const { readFile, writeFile } = require("../utils/fileHandler.js");
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
module.exports = { getBooks, addBook };
