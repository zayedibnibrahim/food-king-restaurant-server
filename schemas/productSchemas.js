const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type:   String
    },
    weight: {
        type:   String
    },
    image: {
        type:   String
    },
    categoryId: {
        type:   String
    }
})

module.exports = productSchema;