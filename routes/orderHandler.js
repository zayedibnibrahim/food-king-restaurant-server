import express from 'express'
import Order from '../models/orderModel.js'

const router = express.Router()

//POST a order
router.post('/', async (req, res) => {
  const newOrder = new Order(req.body)
  await newOrder.save((err, data) => {
    if (err) {
      res.status(500).json({
        error: 'There was a server side error!',
      })
    } else {
      res.status(200).json({
        res: data._id,
        message: 'Order was inserted successfully!',
      })
    }
  })
})

export default router
