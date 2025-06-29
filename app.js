const express = require("express");
const app = express();
const router = require('./routes/books.js');
const errorHandler = require('./middleware/errorHandler.js');

app.use(express.json()); // Automatically turn a object request body into a JSON format 
app.use("/api", router);
app.use(express.static('public'));
app.use(errorHandler);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found'});
});

app.listen(3000);
