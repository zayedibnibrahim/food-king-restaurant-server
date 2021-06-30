import mongoose from 'mongoose'
const orderSchema = mongoose.Schema({
  isSignedIn: {
    type: Boolean,
  },
  photo: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  products: {
    type: Object,
  },
  shipment: {
    type: Object,
  },
})
const Order = mongoose.model('Order', orderSchema)
export default Order
