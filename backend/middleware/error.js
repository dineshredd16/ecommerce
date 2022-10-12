const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";
  res.status(err.statusCode).json({status: false, error: err.message, fullError: err.stack});
}