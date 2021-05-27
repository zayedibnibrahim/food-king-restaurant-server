const express = require('express')
const mongoose = require('mongoose')
const productHandler = require('./routeHandler/productHandler')
const orderHandler = require('./routeHandler/orderHandler')
const categoryHandler = require('./routeHandler/categoryHandler')
require('dotenv').config()


const app = express()
app.use(express.json());

const port = 4200

//Mongoose Connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6gnbd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));


app.use("/product", productHandler)
app.use("/order", orderHandler)
app.use("/category", categoryHandler)


app.get('/', (req, res) => {
  res.send("Hi this is the server of Food King")
})

app.listen(process.env.PORT || port)