const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
    stock: {
        type: String
    },
    image: {
        type: Object
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    },
    addon: [{
        type: mongoose.Types.ObjectId,
        ref: "addon"
    }]
})

module.exports = productSchema;