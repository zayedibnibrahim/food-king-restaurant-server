import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import path from 'path'
import cors from 'cors'
import productHandler from './routes/productHandler.js'
import orderHandler from './routes/orderHandler.js'
import categoryHandler from './routes/categoryHandler.js'
import addonHandler from './routes/addonHandler.js'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
dotenv.config()
const app = express()

//Mongoose Connect
connectDB()

app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(express.json())

app.use('/api/product', productHandler)
app.use('/api/order', orderHandler)
app.use('/api/category', categoryHandler)
app.use('/api/addon', addonHandler)

app.get('/', (req, res) => {
  res.send('Hi this is the server of Food King')
})
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4200
app.listen(PORT, console.log('Server running at 4200'.yellow.bold))
