const multer = require('multer')
const path = require("path");

module.exports = multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName =
                file.originalname
                    .replace(fileExt, "")
                    .toLowerCase()
                    .split(" ")
                    .join("-") +
                "-" +
                Date.now();
    
            cb(null, fileName + fileExt);
        }
    }),
    limits: {
        fileSize: 5000000, // 5MB
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === "image") {
            if (
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg"
            ) {
                cb(null, true);
            } else {
                cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
            }
        } else {
            cb(new Error("There was an unknown error!"));
        }
    }
  });