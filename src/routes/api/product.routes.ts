import { Router } from 'express';
import { createProduct, getProducts } from '../../controller/product.controller';
import upload from '../../utils/multer';

const router = Router();

router.get('/', getProducts);
router.post('/',upload.single('image'), createProduct);

export default router;