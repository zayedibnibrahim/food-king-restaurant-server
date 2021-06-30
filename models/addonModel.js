import mongoose from 'mongoose'
const addonSchema = mongoose.Schema({
  addon: {
    type: String,
  },
})
const Addon = mongoose.model('Addon', addonSchema)

export default Addon
