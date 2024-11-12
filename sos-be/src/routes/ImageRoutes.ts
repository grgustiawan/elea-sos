import { Router } from 'express';
import {ImageController} from '../controllers/ImageController'

const ImageRoutes = Router();
const imageController = new ImageController();

ImageRoutes.get('/image/food', imageController.getFoodImage);
ImageRoutes.get('/image/category', imageController.getCategoryImage);

export default ImageRoutes;
