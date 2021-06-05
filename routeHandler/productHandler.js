const express = require('express')
const router = express.Router();
const multer = require('multer')
const path = require("path");
const mongoose = require('mongoose')
const productSchema = require('../schemas/productSchemas')
const Product = new mongoose.model('product', productSchema)


const UPLOADS_FOLDER = "./uploads/"

// var upload = multer({
//     dest: UPLOADS_FOLDER
// })

// define the storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
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
    },
});

// prepare the final multer upload object
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000, // 1MB
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
    },
});


//POST a product
router.post('/', upload.single('image'), async (req, res) => {
    const newProduct = new Product(req.body)
    console.log(req.file.path)
    await newProduct.save((err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                res: data._id,
                image: req.file.path,
                message: "Todo was inserted successfully!",
            });
        }
    })
})

//delete a product
router.delete('/:id', async (req, res) => {
    await Product.deleteOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                res: data.deletedCount > 0,
                message: "Todo was Deleted successfully!",
            });
        }
    })
})

//get all product
router.get('/', async (req, res) => {
    await Product.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                res: data
            });
        }
    })
})

//by id
router.get('/:id', async (req, res) => {
    await Product.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                res: data
            });
        }
    })
})

//by many id
router.post('/idbundle', async (req, res) => {
    await Product.find({ _id: { $in: req.body } }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                res: data
            });
        }
    })
})

//products by specific category
router.get('/productByCategory/:id', async (req, res) => {
    await Product.find({ categoryId: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                res: data
            });
        }
    })
})

module.exports = router;