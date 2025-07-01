const express = require("express");
const app = express();
const booksRouter = require('./routes/books.js');
const usersRouter = require('./routes/users.js');
const errorHandler = require('./middleware/errorHandler.js');

app.use(express.json());
app.use("/api", booksRouter);
app.use("/api", usersRouter);
app.use(express.static('public'));

// 404 handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler (should be last)
app.use(errorHandler);

app.listen(3000);
