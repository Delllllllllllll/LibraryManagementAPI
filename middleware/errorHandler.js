const express = require("express");
const app = express();

module.exports = app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ error: err.message || 'Internal Server Error'});
})


