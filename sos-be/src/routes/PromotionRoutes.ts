import { Router } from 'express';
import { PromotionController } from '../controllers/PromotionController';

const PromotionRoutes = Router();
const promotionController = new PromotionController();

PromotionRoutes.post('/promotions', promotionController.createPromotion);
PromotionRoutes.get('/promotions', promotionController.getAllPromotions);
PromotionRoutes.get('/promotions/:id', promotionController.getPromotionById);
PromotionRoutes.put('/promotions/:id', promotionController.updatePromotion);
PromotionRoutes.delete('/promotions/:id', promotionController.deletePromotion);

export default PromotionRoutes;
