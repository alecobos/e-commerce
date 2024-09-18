function isValidData(req, res, next) {
  try {
    const { title } = req.body;
    if (!title) {
      const error = new Error("Title is required");
      error.statusCode = 400;
      throw error;
    } else {
      return next();
    }
  } catch (error) {
    throw error;
  }
}

export default isValidData;
