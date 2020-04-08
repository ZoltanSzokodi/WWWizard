const ErrorResponse = require('../utils/errorResponse');

// Global error handler middleware that catches unhandled rejections in the server.js file
// Handy for catching mongoose validation errors, cast errors, etc.
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // for dev purposes
  console.log(err);

  // Mongoose bad object id
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validaton errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
