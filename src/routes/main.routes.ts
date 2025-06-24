import { Router } from 'express';

import { getMainRouteResponse } from '../controller/main.controller';

import userRoutes from '../routes/api/user.routes'
import adminRoutes from '../routes/admin.routes'
import pingRoutes from '../routes/ping.routes';
import productRoutes from '../routes/api/product.routes'
import paymentRoutes from '../routes/api/payment.routes';

const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/products", productRoutes);
router.use("/api/payments", paymentRoutes);
router.use("/admin", adminRoutes);
router.use("/ping", pingRoutes);

router.get('/', getMainRouteResponse);

export default router;