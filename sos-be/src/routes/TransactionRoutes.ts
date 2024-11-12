import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';

const TransactionRoutes = Router();
const transactionController = new TransactionController();

TransactionRoutes.post('/transactions', transactionController.createTransaction);
TransactionRoutes.get('/transactions', transactionController.getAllTransactions);
TransactionRoutes.get('/transactions/:id', transactionController.getTransactionById);
TransactionRoutes.put('/transactions/:id', transactionController.updateTransaction);
TransactionRoutes.delete('/transactions/:id', transactionController.deleteTransaction);

export default TransactionRoutes;
