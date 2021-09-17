const multer = require("multer");

const upload = multer({
  limits: { fileSize: 8000000 },
  fileFilter(req, file, callback) {
    try {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        const error = new Error("Please upload an image");
        return callback(error);
      }

      // Means everything went well
      callback(undefined, true);
    } catch (error) {
      throw new Error(error.message);
    }
  }
});

module.exports = { upload };
