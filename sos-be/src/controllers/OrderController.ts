import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const { tableId, roomId, orderItems, paymentMethodId, amount } = req.body;
      
      const order = await prisma.order.create({
        data: {
          tableNo: tableId,
          roomId: roomId,
          orderItems: {
            create: orderItems
          },
          status: "COMPLETED"
        }
      });

      await prisma.transaction.create({
        data: { 
          orderId: order.id, 
          paymentMethodId: paymentMethodId, 
          amount: amount, 
          status: "SUCCESS" 
        }
      });

      res.status(201).json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await prisma.order.findMany({
        include: { orderItems: true }
      });
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOrderById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const order = await prisma.order.findUnique({
        where: { id: parseInt(id) },
        include: { orderItems: true }
      });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateOrder(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { tableNo, roomId, orderItems, status } = req.body;
      const order = await prisma.order.update({
        where: { id: parseInt(id) },
        data: {
          tableNo: tableNo,
          roomId: roomId,
          status,
          orderItems: {
            create: orderItems
          }
        }
      });
      res.status(200).json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.order.delete({ where: { id: parseInt(id) } });
      res.status(204).json({});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
