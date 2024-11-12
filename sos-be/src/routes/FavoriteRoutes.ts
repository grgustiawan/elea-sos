import { Router } from 'express';
import { FavoriteController } from '../controllers/FavoriteController';

const FavoriteRoutes = Router();
const favoriteController = new FavoriteController();

FavoriteRoutes.post('/favorites', favoriteController.createFavorite);
FavoriteRoutes.get('/favorites', favoriteController.getAllFavorites);
FavoriteRoutes.get('/favorites/:id', favoriteController.getFavoriteById);
FavoriteRoutes.delete('/favorites/:id', favoriteController.deleteFavorite);

export default FavoriteRoutes;
