import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MenuController {
  async createMenu(req: Request, res: Response) {
    try {
      const { name, description, price, categoryId } = req.body;
      const menu = await prisma.menu.create({
        data: { name, description, price, categoryId }
      });
      res.status(201).json(menu);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllMenus(req: Request, res: Response) {
    try {
      const menus = await prisma.menu.findMany({
        include: { category: true }
      });
      res.status(200).json(menus);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMenuById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const menu = await prisma.menu.findUnique({
        where: { id: parseInt(id) },
        include: { category: true }
      });
      if (!menu) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.status(200).json(menu);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateMenu(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { name, description, price, categoryId } = req.body;
      const menu = await prisma.menu.update({
        where: { id: parseInt(id) },
        data: { name, description, price, categoryId }
      });
      res.status(200).json(menu);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteMenu(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.menu.delete({
        where: { id: parseInt(id) }
      });
      res.status(204).json({});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
