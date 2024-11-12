import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PaymentMethodController {
  async createPaymentMethod(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const paymentMethod = await prisma.paymentMethod.create({
        data: { name }
      });
      res.status(201).json(paymentMethod);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllPaymentMethods(req: Request, res: Response) {
    try {
      const paymentMethods = await prisma.paymentMethod.findMany();
      res.status(200).json(paymentMethods);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPaymentMethodById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const paymentMethod = await prisma.paymentMethod.findUnique({
        where: { id: parseInt(id) }
      });
      if (!paymentMethod) {
        return res.status(404).json({ message: 'Payment method not found' });
      }
      res.status(200).json(paymentMethod);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePaymentMethod(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { name } = req.body;
      const paymentMethod = await prisma.paymentMethod.update({
        where: { id: parseInt(id) },
        data: { name }
      });
      res.status(200).json(paymentMethod);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deletePaymentMethod(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.paymentMethod.delete({ where: { id: parseInt(id) } });
      res.status(204).json({});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
