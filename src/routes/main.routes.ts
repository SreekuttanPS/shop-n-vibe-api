import { Router } from 'express';
import { getMainRouteResponse } from '../controller/main.controller';

const router = Router();

router.get('/', getMainRouteResponse);

export default router;