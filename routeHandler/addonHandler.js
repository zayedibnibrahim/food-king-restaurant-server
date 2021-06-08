const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const addonSchema = require('../schemas/addonSchemas')
const Addon = new mongoose.model('addon', addonSchema)

//POST a Addon
router.post('/', async (req, res) => {
    const newAddon = new Addon(req.body)
    await newAddon.save((err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                res: data._id,
                message: "Addon was inserted successfully!",
            });
        }
    })
})

//get all Addon
router.get('/', async (req, res) => {
    await Addon.find({}, (err, data) => {
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