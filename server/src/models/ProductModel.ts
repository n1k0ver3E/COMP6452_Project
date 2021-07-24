import { IProduct } from '../interfaces/product'
import { Model, model, Schema } from 'mongoose'
import { ProductStatus } from '../enums/productContract'

const ProductSchema: Schema = new Schema(
  {
    productId: {
      type: Number,
      unique: true,
    },
    productName: {
      type: String,
    },
    productLocation: {
      type: String,
    },
    plantingDate: {
      type: Date,
    },
    harvestDate: {
      type: Date,
    },
    processingType: {
      type: String,
    },
    timestamp: {
      type: Date,
    },
    price: {
      type: Number,
    },
    status: {
      type: Object.values(ProductStatus),
    },
  },
  { timestamps: true }
)

const Product: Model<IProduct> = model('Product', ProductSchema)

export default Product
