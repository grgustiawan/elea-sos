import { Router } from 'express';
import { SpecialOfferController } from '../controllers/SpecialOfferController';

const SpecialOfferRoutes = Router();
const specialOfferController = new SpecialOfferController();

SpecialOfferRoutes.post('/special-offers', specialOfferController.createSpecialOffer);
SpecialOfferRoutes.get('/special-offers', specialOfferController.getAllSpecialOffers);
SpecialOfferRoutes.get('/special-offers/:id', specialOfferController.getSpecialOfferById);
SpecialOfferRoutes.put('/special-offers/:id', specialOfferController.updateSpecialOffer);
SpecialOfferRoutes.delete('/special-offers/:id', specialOfferController.deleteSpecialOffer);

export default SpecialOfferRoutes;
