import { Request, Response } from 'express';
import path from 'path';

export class ImageController { 
    async getFoodImage (req: Request, res: Response) {
        const { filename } = req.query;

        if (typeof filename !== 'string') {
            return res.status(400).json({ error: 'Filename must be a string' });
        }

        const imagePath = path.join(__dirname, '../../assets/images/food/', filename);

        return res.sendFile(imagePath, (err: any) => {
            if (err) {
            console.error(err);
            res.status(err.status).end();
            }
        });
    }

    async getCategoryImage (req: Request, res: Response) {
        const { filename } = req.query;

        if (typeof filename !== 'string') {
            return res.status(400).json({ error: 'Filename must be a string' });
        }

        const imagePath = path.join(__dirname, '../../assets/images/category/', filename);

        return res.sendFile(imagePath, (err: any) => {
            if (err) {
            console.error(err);
            res.status(err.status).end();
            }
        });
    }
}
