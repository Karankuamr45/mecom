import categoryModel from "../models/categorySchema.js";

const addCategoryController =  async (req, res) => {
    try {
      const { name, description } = req.body;
  
      // Create a new category instance
      const newCategory = new categoryModel({
        name,
        description
      });
  
      // Save the new category to the database
      await newCategory.save();
  
      // Respond with a success message
      res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

const getAllCategoriesController = async (req, res) => {
    try {
      // Fetch all categories from the database
      const categories = await categoryModel.find();
  
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

const getCategoryBYId =  async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      // Find the category by ID
      const category = await categoryModel.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }  


const updateCategoryController =  async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { name, description } = req.body;
  
      // Find the category by ID and update it
      const updatedCategory = await categoryModel.findByIdAndUpdate(
        categoryId,
        { name, description },
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }  


  const deleteCategoryController = async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      // Find the category by ID and delete it
      const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);
  
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.json({ message: 'Category deleted successfully', deletedCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  export {addCategoryController, getAllCategoriesController,getCategoryBYId,updateCategoryController,deleteCategoryController}