import { Router } from 'express';
import controllers from '../controllers';
import middleware from '../middleware';

const router = Router();

router.get('/protected', middleware.protect, controllers.user.protectedRoute);

export default router;
