import multer from "multer";
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
  destination: function (req, file, callback) {
    callback(null, "./public");
  },
});

const upload = multer({ storage: storage });

export default upload