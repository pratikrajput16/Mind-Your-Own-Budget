const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error("🔥 ERROR INSIDE CONTROLLER:");
      console.error(error);
      next(error);
    }
  };
};

module.exports = asyncHandler;