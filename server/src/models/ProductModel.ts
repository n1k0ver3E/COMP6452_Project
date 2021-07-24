import { IProduct } from '../interfaces/product'
import { Model, model, Schema } from 'mongoose'
import { ProductStatus } from '../enums/productContract'

const ProductSchema: Schema = new Schema(
  {
    productId: {
      type: Number,
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
    price: {
      type: Number,
    },
    status: {
      type: Number,
      enum: Object.values(ProductStatus),
      default: ProductStatus.FARMING,
    },
  },
  { timestamps: true }
)

const Product: Model<IProduct> = model('Product', ProductSchema)

export default Product
