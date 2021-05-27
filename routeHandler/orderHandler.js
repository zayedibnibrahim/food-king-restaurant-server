const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const orderSchema = require('../schemas/orderSchemas')
const Order = new mongoose.model('order', orderSchema)

//POST a order
router.post('/', async (req, res) => {
    const newOrder = new Order(req.body)
    await newOrder.save((err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                res: data._id,
                message: "Order was inserted successfully!",
            });
        }
    })
})






module.exports = router;