const express = require('express');
const booksRouter = express.Router();
const { getBooks, addBook, deleteBookId, updateBook } = require('../controller/booksController.js');

booksRouter.route('/books')
            .get(getBooks)
            .post(addBook);

booksRouter.route('/books/:id')
            .delete(deleteBookId)
            .patch(updateBook);

module.exports = booksRouter;
