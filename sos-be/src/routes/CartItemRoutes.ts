import { Router } from 'express';
import { CartItemController } from '../controllers/CartItemController';

const CartitemRoutes = Router();
const cartItemController = new CartItemController();

CartitemRoutes.post('/cart-items', cartItemController.createCartItem);
CartitemRoutes.get('/cart-items', cartItemController.getAllCartItems);
CartitemRoutes.get('/cart-items/:id', cartItemController.getCartItemById);
CartitemRoutes.put('/cart-items/:id', cartItemController.updateCartItem);
CartitemRoutes.delete('/cart-items/:id', cartItemController.deleteCartItem);

export default CartitemRoutes;
