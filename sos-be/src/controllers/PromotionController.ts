import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PromotionController {
  async createPromotion(req: Request, res: Response) {
    try {
      const { name, description, menuId, validFrom, validUntil } = req.body;
      const promotion = await prisma.promotion.create({
        data: { name, description, menuId, validFrom, validUntil }
      });
      res.status(201).json(promotion);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllPromotions(req: Request, res: Response) {
    try {
      const promotions = await prisma.promotion.findMany({ include: { menu: true}});
      res.status(200).json(promotions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPromotionById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const promotion = await prisma.promotion.findUnique({
        where: { id: parseInt(id) }
      });
      if (!promotion) {
        return res.status(404).json({ message: 'Promotion not found' });
      }
      res.status(200).json(promotion);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePromotion(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { name, description, menuId, validFrom, validUntil } = req.body;
      const promotion = await prisma.promotion.update({
        where: { id: parseInt(id) },
        data: { name, description, menuId, validFrom, validUntil }
      });
      res.status(200).json(promotion);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deletePromotion(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.promotion.delete({ where: { id: parseInt(id) } });
      res.status(204).json({});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
