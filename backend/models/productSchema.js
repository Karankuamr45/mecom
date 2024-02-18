import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
  },
    brand: {
      type: String
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'unisex']
    },
    size: {
      type: String
    },
    color: {
      type: String
    },
    material: {
      type: String
    },
    imageUrl: {
      type: String
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    tags: [{ type: String }],
    reviews: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String }
    }],
    discount: { type: Number, min: 0, max: 100 },
    isOnSale: { type: Boolean, default: false },
    weight: { type: Number },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number }
    },
    relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    isAvailable: { type: Boolean, default: true },
    lowStockAlert: { type: Number, default: 10 },
    variants: [{
      size: { type: String },
      color: { type: String },
      price: { type: Number },
      quantity: { type: Number }
    }]
  });


  const productModel = mongoose.model("Product",productSchema);
  export default productModel;
  