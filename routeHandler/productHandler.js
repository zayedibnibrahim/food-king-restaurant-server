const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const productSchema = require('../schemas/productSchemas')
const Product = new mongoose.model('product', productSchema)

//POST a product
router.post('/', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save((err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                res: data._id,
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
    await Product.find({ _id: {$in: req.body} }, (err, data) => {
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
    await Product.find({categoryId: req.params.id}, (err, data) => {
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