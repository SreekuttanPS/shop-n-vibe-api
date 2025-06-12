import { Router } from 'express';

import { getMainRouteResponse } from '../controller/main.controller';

import userRoutes from '../routes/api/user.routes'
import adminRoutes from '../routes/admin.routes'
import productRoutes from '../routes/api/product.routes'

const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/products", productRoutes);
router.use("/admin", adminRoutes);

router.get('/', getMainRouteResponse);

export default router;