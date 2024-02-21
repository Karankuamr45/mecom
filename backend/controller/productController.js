import generateRandomProducts from "../utils/generateRandomProducts.js";

// Controller function to add a product

import productModel from "../models/productSchema.js";

const addProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      category,
      brand,
      gender,
      size,
      color,
      material,
      imageUrl,
      tags,
      discount,
      isOnSale,
      weight,
      dimensions,
      relatedProducts,
      isAvailable,
      lowStockAlert,
      variants,
    } = req.body;

    // Create a new product instance
    const newProduct = new productModel({
      name,
      description,
      price,
      quantity,
      category,
      brand,
      gender,
      size,
      color,
      material,
      imageUrl,
      createdBy: req.userId, // Attach user ID from authentication middleware
      tags,
      discount,
      isOnSale,
      weight,
      dimensions,
      relatedProducts,
      isAvailable,
      lowStockAlert,
      variants,
    });

    // Save the new product to the database
    await newProduct.save();

    // Respond with a success message
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProductController = async (req, res) => {
  const productId = req.params.id;

  try {
    // Find the product by ID and delete it
    const deletedProduct = await productModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProductController = async (req, res) => {
  const productId = req.params.id;
  const updateData = req.body;

  try {
    // Find the product by ID and update it
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProductController = async (req, res) => {
  try {
    // Fetch all products from the database and populate the 'category' field with 'name'
    const products = await productModel.find().populate('category', 'name');

    // Check if products exist
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const searchProductsController = async (req, res) => {
    try {
      const { query } = req.query;
  
      // Perform regex search operation based on the query
      const products = await productModel.find({
        $or: [
          { name: { $regex: query, $options: 'i' } }, // Case-insensitive matching for name
          { description: { $regex: query, $options: 'i' } }, // Case-insensitive matching for description
          { category: { $regex: query, $options: 'i' } }, // Case-insensitive matching for category
          { brand: { $regex: query, $options: 'i' } } // Case-insensitive matching for brand
          // Add more fields for search as needed
        ]
      });
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

  const filterAndSortProductsController = async (req, res) => {
    try {
        // Extract filter, sort, and pagination parameters from request query
        const { category, priceMin, priceMax, sortBy, sortOrder, page, limit } = req.query;
        
        // Construct filter object based on request query parameters
        const filter = {};
        if (category) filter.category = category;
        if (priceMin) filter.price = { $gte: parseInt(priceMin) };
        if (priceMax) filter.price = { ...filter.price, $lte: parseInt(priceMax) };

        let sortOption = {};
        if (sortBy && sortOrder) {
            sortOption[sortBy] = sortOrder === 'asc' ? 1 : -1;
        } else {
            // Set default sorting option if sortBy or sortOrder is not provided
            sortOption = { createdAt: -1 }; // Example default sorting option
        }

        // Calculate skip value for pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Perform find operation with applied filter, sort, and pagination options
        const products = await productModel.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit));

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const relatedProductController = async (req, res) => {
  try {
      const productIds = req.query.productIds; // Assuming productIds is an array of product IDs

      // Find products by IDs and populate the related products field
      const products = await Product.find({ _id: { $in: productIds } }).populate('relatedProducts');

      if (!products) {
          return res.status(404).json({ message: 'Products not found' });
      }

      // Extract related products from all products
      const relatedProducts = products.reduce((acc, product) => {
          acc.push(...product.relatedProducts);
          return acc;
      }, []);

      res.json(relatedProducts);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

  

export {
  addProductController,
  deleteProductController,
  updateProductController,
  getAllProductController,
  searchProductsController,
  filterAndSortProductsController,
  relatedProductController,
};
