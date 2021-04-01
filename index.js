const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(cors());
app.use(bodyParser.json());
const port = 42000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)