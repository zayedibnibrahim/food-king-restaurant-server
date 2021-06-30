import express from 'express'
const router = express.Router()

import upload from '../utils/multer.js'
import cloudinary from '../utils/cloudinary.js'
import Product from '../models/productModel.js'

//POST a product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: 'for_food',
      use_filename: true,
    })

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      categoryId: req.body.categoryId,
      addon: req.body.addon.split(','),
      image: {
        url: result.secure_url,
        cloudinary_id: result.public_id,
      },
    })
    // console.log(newProduct)
    await newProduct.save((err, data) => {
      if (err) {
        res.status(500).json({
          error: 'There was a server side error!',
        })
      } else {
        res.status(200).json({
          message: 'Product was inserted successfully!',
        })
      }
    })
  } catch (error) {
    console.log(error)
  }
})

//delete a product
router.delete('/:id', async (req, res) => {
  //Deleted Image from cloudinary
  const result = await Product.find({ _id: req.params.id })
  await cloudinary.uploader.destroy(result[0].image.cloudinary_id)

  await Product.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: 'There was a server side error!',
      })
    } else {
      res.status(200).json({
        res: data.deletedCount > 0,
        message: 'Todo was Deleted successfully!',
      })
    }
  })
})

//get all product
router.get('/', async (req, res) => {
  await Product.find({}, (err, data) => {
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

//by id
router.get('/:id', async (req, res) => {
  await Product.find({ _id: req.params.id }, (err, data) => {
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

//by many id
router.post('/idbundle', async (req, res) => {
  await Product.find({ _id: { $in: req.body } })
    .populate('addon')
    .exec((err, data) => {
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

//products by specific category
router.get('/productByCategory/:id', async (req, res) => {
  await Product.find({ categoryId: req.params.id })
    .populate('categoryId')
    .populate('addon')
    .exec((err, data) => {
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
