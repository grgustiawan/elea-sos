import { Router } from 'express';
import { RestaurantBranchController } from '../controllers/RestaruantController';

const RestaurantBranchRoutes = Router();
const restaurantBranchController = new RestaurantBranchController();

RestaurantBranchRoutes.post('/branches', restaurantBranchController.createBranch);
RestaurantBranchRoutes.get('/branches', restaurantBranchController.getAllBranches);
RestaurantBranchRoutes.get('/branches/:id', restaurantBranchController.getBranchById);
RestaurantBranchRoutes.put('/branches/:id', restaurantBranchController.updateBranch);
RestaurantBranchRoutes.delete('/branches/:id', restaurantBranchController.deleteBranch);

export default RestaurantBranchRoutes;
