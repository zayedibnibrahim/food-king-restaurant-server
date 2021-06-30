import mongoose from 'mongoose'
const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  stock: {
    type: String,
  },
  image: {
    type: Object,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: 'category',
  },
  addon: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'addon',
    },
  ],
})
const Product = mongoose.model('Product', productSchema)
export default Product
