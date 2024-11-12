import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CategoryController {
  async createCategory(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const category = await prisma.category.create({
        data: { name, description }
      });
      res.status(201).json(category);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCategories(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany();
      res.status(200).json(categories);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany({
        include: { menus: true }
      });
      res.status(200).json(categories);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const category = await prisma.category.findUnique({
        where: { id: parseInt(id) },
        include: { menus: true }
      });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { name, description } = req.body;
      const category = await prisma.category.update({
        where: { id: parseInt(id) },
        data: { name, description }
      });
      res.status(200).json(category);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.category.delete({
        where: { id: parseInt(id) }
      });
      res.status(204).json({});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
