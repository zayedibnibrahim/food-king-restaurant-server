const express = require('express')
const app = express()
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(cors());
app.use(bodyParser.json());
const port = 4200

app.get('/', (req, res) => {
  res.send("Hi this is the server of Food King")
})



const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6gnbd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("food-king").collection("products");
  const collectionOfOrder = client.db("food-king").collection("orders");
  //add products
  app.post('/addproductdb', (req, res) => {
    const product = req.body;
    collection.insertOne(product)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })

  //get products
  app.get('/allproduct', (req, res) => {
    collection.find({})
      .toArray((err, document) => {
        res.send(document)
      })
  })

  //delete product
  app.delete('/delete/:id', (req, res) => {
    collection.deleteOne({ key: req.params.id })
      .then(function (result) {
        res.send(result.deletedCount > 0)
      })
  })

  //by keys
  app.post('/productsByKeys', (req, res) => {
    const productsKeys = req.body;
    collection.find({ key: { $in: productsKeys } })
      .toArray((err, document) => {
        res.send(document)
      })
  })
  //Add orderss
  app.post('/addOrders', (req, res) => {
    const ordersDetails = req.body;
    collectionOfOrder.insertOne(ordersDetails)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })
});



app.listen(process.env.PORT || port)