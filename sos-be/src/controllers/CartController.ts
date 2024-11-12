import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CartController {
  async createCart(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const cart = await prisma.cart.create({
        data: { userId }
      });
      res.status(201).json(cart);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCarts(req: Request, res: Response) {
    try {
      const carts = await prisma.cart.findMany({ include: { cartItems: true } });
      res.status(200).json(carts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCartByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const cart = await prisma.cart.findUnique({
        where: { userId: parseInt(userId) },
        include: { cartItems: true }
      });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.status(200).json(cart);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCart(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { userId } = req.body;
      const cart = await prisma.cart.update({
        where: { id: parseInt(id) },
        data: { userId }
      });
      res.status(200).json(cart);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCart(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.cart.delete({ where: { id: parseInt(id) } });
      res.status(204).json({});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
