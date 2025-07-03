require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const booksRouter = require("./routes/books.js");
const usersRouter = require("./routes/users.js");
const authRouter = require("./routes/auth.js");
const errorHandler = require("./middleware/errorHandler.js");

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth/login', express.static("public"));
app.use(express.urlencoded({ extended: true}));
app.use("/api", booksRouter);
app.use("/api", usersRouter);
app.use("/api", authRouter);


// 404 handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});


// Error handler (should be last)
app.use(errorHandler);

app.listen(process.env.PORT);
