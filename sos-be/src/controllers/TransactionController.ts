import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TransactionController {
  async createTransaction(req: Request, res: Response) {
    try {
      const { orderId, paymentMethodId, amount, status } = req.body;
      const transaction = await prisma.transaction.create({
        data: { orderId, paymentMethodId, amount, status }
      });
      res.status(201).json(transaction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllTransactions(req: Request, res: Response) {
    try {
      const transactions = await prisma.transaction.findMany();
      res.status(200).json(transactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTransactionById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const transaction = await prisma.transaction.findUnique({
        where: { id: parseInt(id) }
      });
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.status(200).json(transaction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTransaction(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { orderId, paymentMethodId, amount, status } = req.body;
      const transaction = await prisma.transaction.update({
        where: { id: parseInt(id) },
        data: { orderId, paymentMethodId, amount, status }
      });
      res.status(200).json(transaction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.transaction.delete({ where: { id: parseInt(id) } });
      res.status(204).json({});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
