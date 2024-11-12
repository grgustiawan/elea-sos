import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const UserRouter = Router();
const userController = new UserController();

UserRouter.post('/users', userController.createUser);
UserRouter.get('/users', userController.getAllUsers);
UserRouter.get('/users/:id', userController.getUserById);
UserRouter.put('/users/:id', userController.updateUser);
UserRouter.delete('/users/:id', userController.deleteUser);

export default UserRouter;
