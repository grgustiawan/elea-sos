import { Router } from 'express';
import { PaymentMethodController } from '../controllers/PaymentMethodController';

const PaymentMethodRoutes = Router();
const paymentMethodController = new PaymentMethodController();

PaymentMethodRoutes.post('/payment-methods', paymentMethodController.createPaymentMethod);
PaymentMethodRoutes.get('/payment-methods', paymentMethodController.getAllPaymentMethods);
PaymentMethodRoutes.get('/payment-methods/:id', paymentMethodController.getPaymentMethodById);
PaymentMethodRoutes.put('/payment-methods/:id', paymentMethodController.updatePaymentMethod);
PaymentMethodRoutes.delete('/payment-methods/:id', paymentMethodController.deletePaymentMethod);

export default PaymentMethodRoutes;
