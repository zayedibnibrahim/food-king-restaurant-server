const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(cors());
app.use(bodyParser.json());
const port = 42000

app.get('/', (req, res) => {
  res.send("Hi this is the server of Food King")
})



const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6gnbd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("food-king").collection("products");
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

});



app.listen(process.env.PORT || port)