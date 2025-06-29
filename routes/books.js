const express = require('express');
const router = express.Router();
const { getBooks, addBook, deleteBookId } = require('../controller/booksController.js');

router.route('/books')
            .get(getBooks)
            .post(addBook);

router.route('/books/:id')
            .delete(deleteBookId);

module.exports = router;
