const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const productSchema = require('../schemas/productSchemas')
const Product = new mongoose.model('product', productSchema)
const upload = require('../utils/multer')
const cloudinary = require('../utils/cloudinary')

//POST a product
router.post('/', upload.single('image'), async (req, res) => {

    try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: 'for_food',
            use_filename: true
        });
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            weight: req.body.weight,
            categoryId: req.body.categoryId,
            image: {
                url: result.secure_url,
                cloudinary_id: result.public_id
            }
        })

        await newProduct.save((err, data) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    message: "Product was inserted successfully!",
                });
            }
        })
    } catch (error) {
        console.log(error)
    }

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
    await Product.find({ categoryId: req.params.id })
        .populate("categoryId")
        .exec((err, data) => {
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