import { Router } from 'express';
import { CartController } from '../controllers/CartController';

const CartRoutes = Router();
const cartController = new CartController();

CartRoutes.post('/carts', cartController.createCart);
CartRoutes.get('/carts', cartController.getAllCarts);
CartRoutes.get('/carts/user/:userId', cartController.getCartByUserId);
CartRoutes.put('/carts/:id', cartController.updateCart);
CartRoutes.delete('/carts/:id', cartController.deleteCart);

export default CartRoutes;
