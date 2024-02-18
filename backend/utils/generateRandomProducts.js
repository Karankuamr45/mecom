import casual from 'casual';
import mongoose from 'mongoose';
import productModel from '../models/productSchema.js';

// Generate random product data
const generateRandomProducts = async () => {
  try {
    const products = [];
    for (let i = 0; i < 20; i++) {
      const product = new productModel({
        name: casual.title,
        description: casual.sentence,
        price: casual.integer(10, 1000),
        quantity: casual.integer(1, 100),
        category: casual.random_element(['T-shirt', 'Pants', 'Shoes', 'Dresses', 'Accessories']),
        brand: casual.company_name,
        gender: casual.random_element(['male', 'female', 'unisex']),
        size: casual.random_element(['S', 'M', 'L', 'XL']),
        color: casual.color_name,
        material: casual.random_element(['cotton', 'polyester', 'wool', 'silk']),
        imageUrl: casual.url,
        // createdBy: mongoose.Types.ObjectId(), // Assuming you have user IDs stored in your database
        createdAt: casual.date('YYYY-MM-DD'),
        tags: [casual.word, casual.word],
        discount: casual.integer(0, 50),
        isOnSale: casual.boolean,
        weight: casual.integer(1, 20),
        dimensions: {
          length: casual.integer(10, 100),
          width: casual.integer(5, 50),
          height: casual.integer(5, 50)
        },
        relatedProducts: [], // You can populate related products if you have them
        isAvailable: casual.boolean,
        lowStockAlert: casual.integer(1, 20),
        variants: []
      });
      products.push(product);
    }
    await productModel.insertMany(products);
    console.log('Random products created successfully!');
  } catch (err) {
    console.error('Error generating random products:', err);
  }
};

export default generateRandomProducts;
