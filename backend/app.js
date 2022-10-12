const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");

app.use(express.json());

// route exports
const product = require("./routes/productRoute");

app.use("/api/v1", product);

// middleware error handler
app.use(errorMiddleware);

module.exports = app;