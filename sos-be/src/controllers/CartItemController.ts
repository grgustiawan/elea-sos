import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CartItemController {
  async createCartItem(req: Request, res: Response) {
    try {
      const { cartId, menuId, quantity } = req.body;
      const cartItem = await prisma.cartItem.create({
        data: { cartId, menuId, quantity }
      });
      res.status(201).json(cartItem);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCartItems(req: Request, res: Response) {
    try {
      const cartItems = await prisma.cartItem.findMany();
      res.status(200).json(cartItems);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCartItemById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const cartItem = await prisma.cartItem.findUnique({
        where: { id: parseInt(id) }
      });
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
      res.status(200).json(cartItem);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCartItem(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { cartId, menuId, quantity } = req.body;
      const cartItem = await prisma.cartItem.update({
        where: { id: parseInt(id) },
        data: { cartId, menuId, quantity }
      });
      res.status(200).json(cartItem);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCartItem(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.cartItem.delete({ where: { id: parseInt(id) } });
      res.status(204).json({});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
