import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FavoriteController {
  async createFavorite(req: Request, res: Response) {
    try {
      const { userId, menuId } = req.body;
      const favorite = await prisma.favorite.create({
        data: { userId, menuId }
      });
      res.status(201).json(favorite);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllFavorites(req: Request, res: Response) {
    try {
      const favorites = await prisma.favorite.findMany();
      res.status(200).json(favorites);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getFavoriteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const favorite = await prisma.favorite.findUnique({
        where: { id: parseInt(id) }
      });
      if (!favorite) {
        return res.status(404).json({ message: 'Favorite not found' });
      }
      res.status(200).json(favorite);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteFavorite(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.favorite.delete({ where: { id: parseInt(id) } });
      res.status(204).json({});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
