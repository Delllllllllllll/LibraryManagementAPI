const express = require("express");
const app = express();

module.exports = (err, req, res, next) => {
    res.status(500).json({ error: err.message || 'Internal Server Error'});
}


