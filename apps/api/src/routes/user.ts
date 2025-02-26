import { Router } from 'express';
import controllers from '../controllers';
import middleware from '../middleware';

const router = Router();

router.get('/me', middleware.protect, controllers.user.me);

export default router;
