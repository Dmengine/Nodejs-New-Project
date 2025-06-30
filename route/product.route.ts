import express from 'express';
import { CreateProduct } from '../controller/product.controller';
import { verifyToken, requireRole } from '../middleware/admin.middleware';

const router = express.Router();

router.post(
  '/createproduct',
  verifyToken,
  requireRole('admin'),
  CreateProduct
);

export default router;