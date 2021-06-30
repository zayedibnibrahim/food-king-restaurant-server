import express from 'express'
import Addon from '../models/addonModel.js'

const router = express.Router()

//POST a Addon
router.post('/', async (req, res) => {
  const newAddon = new Addon(req.body)
  await newAddon.save((err, data) => {
    if (err) {
      res.status(500).json({
        error: 'There was a server side error!',
      })
    } else {
      res.status(200).json({
        res: data._id,
        message: 'Addon was inserted successfully!',
      })
    }
  })
})

//get all Addon
router.get('/', async (req, res) => {
  await Addon.find({}, (err, data) => {
    if (err) {
      res.status(500).json({
        error: 'There was a server side error!',
      })
    } else {
      res.status(200).json({
        res: data,
      })
    }
  })
})

export default router
