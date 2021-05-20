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
  const collectionOfCategory = client.db("food-king").collection("category");
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
    collection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })

  //by keys
  app.post('/productsByKeys', (req, res) => {
    const productsKeys = req.body.map(pd => ObjectId(pd));
    collection.find({ _id: { $in: productsKeys } })
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

  //Add Category
  app.post('/addCategoryDb', (req, res) => {
    const category = req.body;
    collectionOfCategory.insertOne(category)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })

  //get category
  app.get('/allCategory', (req, res) => {
    collectionOfCategory.find({})
      .toArray((err, doc) => {
        res.send(doc)
      })
  })

  //get product by category
  app.post('/productByCategory', (req, res) => {
    const category = req.body.catId
    collection.find({ categoryId : category})
    .toArray((err, doc) => {
      res.send(doc)
    })
  })
});



app.listen(process.env.PORT || port)