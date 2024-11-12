import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RestaurantBranchController {
  async createBranch(req: Request, res: Response) {
    try {
      const { branchName, address, city, state, postalCode, country, phoneNumber, email } = req.body;
      const branch = await prisma.restaurantBranch.create({
        data: { branchName, address, city, state, postalCode, country, phoneNumber, email },
      });
      res.status(201).json(branch);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllBranches(req: Request, res: Response) {
    try {
      const branches = await prisma.restaurantBranch.findMany();
      res.status(200).json(branches);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBranchById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const branch = await prisma.restaurantBranch.findUnique({
        where: { id: parseInt(id) }
      });
      if (!branch) {
        return res.status(404).json({ message: 'Branch not found' });
      }
      res.status(200).json(branch);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateBranch(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { branchName, address, city, state, postalCode, country, phoneNumber, email } = req.body;
      const branch = await prisma.restaurantBranch.update({
        where: { id: parseInt(id) },
        data: { branchName, address, city, state, postalCode, country, phoneNumber, email },
      });
      res.status(200).json(branch);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteBranch(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.restaurantBranch.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).json({});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
