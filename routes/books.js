const express = require('express');
const router = express.Router();
const { getBooks, addBook } = require('../controller/booksController.js');

// GET 
router.get('/books', getBooks);
router.post('/books', addBook)

module.exports = router;
