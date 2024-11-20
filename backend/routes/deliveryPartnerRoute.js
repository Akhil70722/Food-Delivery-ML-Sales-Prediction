import express from 'express';
import {
  createDeliveryPartner,
  getAllDeliveryPartners,
  getDeliveryPartnerById,
  updateDeliveryPartner,
  deleteDeliveryPartner,
} from '../controllers/deliverypartnerController.js';
import authMiddleware from '../middleware/auth.js';
const router = express.Router();

router.post('/', createDeliveryPartner);
router.get('/', getAllDeliveryPartners);
router.get('/:id', getDeliveryPartnerById);
router.put('/:id', updateDeliveryPartner);
router.delete('/:id', deleteDeliveryPartner);

export default router;
