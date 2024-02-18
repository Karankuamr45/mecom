import express from "express";
import {addProductController, deleteProductController, filterAndSortProductsController, getAllProductController, searchProductsController, updateProductController} from "../controller/productController.js";
import authenticateUser from "../middlewares/authenticate.js";
const productRoutes = express.Router();

productRoutes.post('/addProduct',authenticateUser,addProductController);
productRoutes.delete('/deleteProduct/:id',authenticateUser,deleteProductController );
productRoutes.put('/updateProduct/:id',authenticateUser, updateProductController);
productRoutes.get('/getAllProducts',getAllProductController);
// Define a route for searching products
productRoutes.get('/search', searchProductsController);
// Define a route for filtering and sorting products
productRoutes.get('/filter', filterAndSortProductsController);





export default productRoutes;