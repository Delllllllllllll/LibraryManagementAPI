const express = require('express');
const router = express.Router();
const { getBooks, addBook, deleteBookId, updateBook } = require('../controller/booksController.js');

router.route('/books')
            .get(getBooks)
            .post(addBook);

router.route('/books/:id')
            .delete(deleteBookId)
            .patch(updateBook);

module.exports = router;
