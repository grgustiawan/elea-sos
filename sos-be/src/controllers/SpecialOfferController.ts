import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SpecialOfferController {
  async createSpecialOffer(req: Request, res: Response) {
    try {
      const { name, discount, menuId, validFrom, validUntil } = req.body;
      const specialOffer = await prisma.specialOffer.create({
        data: { name, discount, menuId, validFrom, validUntil }
      });
      res.status(201).json(specialOffer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllSpecialOffers(req: Request, res: Response) {
    try {
      const specialOffers = await prisma.specialOffer.findMany({
        include: { menu: true }
      });

      res.status(200).json(specialOffers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSpecialOfferById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const specialOffer = await prisma.specialOffer.findUnique({
        where: { id: parseInt(id) }
      });
      if (!specialOffer) {
        return res.status(404).json({ message: 'Special offer not found' });
      }
      res.status(200).json(specialOffer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateSpecialOffer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { name, discount, menuId, validFrom, validUntil } = req.body;
      const specialOffer = await prisma.specialOffer.update({
        where: { id: parseInt(id) },
        data: { name, discount, menuId, validFrom, validUntil }
      });
      res.status(200).json(specialOffer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteSpecialOffer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.specialOffer.delete({ where: { id: parseInt(id) } });
      res.status(204).json({});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
