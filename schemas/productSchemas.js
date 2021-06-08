const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
    weight: {
        type: String
    },
    image: {
        type: Object
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    },
    addon: {
        type: Array
    }
})

module.exports = productSchema;