import express from "express";
import authenticateUser from "../middlewares/authenticate.js";
import { addCategoryController, deleteCategoryController, getAllCategoriesController, getCategoryBYId, updateCategoryController } from "../controller/categoryController.js";
const categoryRoutes = express.Router();

categoryRoutes.post('/addCategory',addCategoryController);
// Controller for fetching all categories
categoryRoutes.get('/getAllCategories',getAllCategoriesController);
// Controller for fetching a category by ID
categoryRoutes.get('/getCategory/:id',getCategoryBYId);
// Controller for updating a category by ID
categoryRoutes.put('/updateCategory/:id',updateCategoryController);
// Controller for deleting a category by ID
categoryRoutes.delete('/deleteCategory/:id',deleteCategoryController);







export default categoryRoutes;