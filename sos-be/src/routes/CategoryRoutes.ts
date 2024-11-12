import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';

const CategoryRoutes = Router();
const categoryController = new CategoryController();

CategoryRoutes.get('/category', categoryController.getCategories);
CategoryRoutes.post('/categories', categoryController.createCategory);
CategoryRoutes.get('/categories', categoryController.getAllCategories);
CategoryRoutes.get('/categories/:id', categoryController.getCategoryById);
CategoryRoutes.put('/categories/:id', categoryController.updateCategory);
CategoryRoutes.delete('/categories/:id', categoryController.deleteCategory);

export default CategoryRoutes;
