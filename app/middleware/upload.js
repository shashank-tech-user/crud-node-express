const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "/assets/uploads/");
  },
  filename: (req, file, callback) => {
    console.log("file name => ", file.originalname);
    callback(null, file.originalname);
  }
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize }
}).single("file");

let uploadFileMiddleWare = util.promisify(uploadFile);

module.exports = uploadFileMiddleWare;
