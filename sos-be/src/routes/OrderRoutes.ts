import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';

const OrderRoutes = Router();
const orderController = new OrderController();

OrderRoutes.post('/orders', orderController.createOrder);
OrderRoutes.get('/orders', orderController.getAllOrders);
OrderRoutes.get('/orders/:id', orderController.getOrderById);
OrderRoutes.put('/orders/:id', orderController.updateOrder);
OrderRoutes.delete('/orders/:id', orderController.deleteOrder);

export default OrderRoutes;
