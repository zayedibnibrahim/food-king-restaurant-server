const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const categorySchema = require('../schemas/categorySchemas')
const Category = new mongoose.model('category', categorySchema)

//POST a Category
router.post('/', async (req, res) => {
    const newCategory = new Category(req.body)
    await newCategory.save((err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                res: data._id,
                message: "Category was inserted successfully!",
            });
        }
    })
})

//get all Category
router.get('/', async (req, res) => {
    await Category.find({}, (err, data) => {
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