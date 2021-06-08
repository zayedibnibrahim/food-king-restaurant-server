const mongoose = require('mongoose')
const addonSchema = mongoose.Schema({
    addon: {
        type: String
    }
})

module.exports = addonSchema;