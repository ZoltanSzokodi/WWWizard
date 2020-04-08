// A wrapper function for async functions to omit try-catch blocks (DRY-KISS)
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
