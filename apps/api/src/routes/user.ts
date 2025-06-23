import { Router } from 'express';
import controllers from '../controllers';
import middleware from '../middleware';

const router = Router();

router.get('/me', middleware.protect, controllers.user.me);

router.post(
  '/user/change-email',
  middleware.protect,
  controllers.user.changeEmail
);
router.post(
  '/user/change-email/confirm',
  middleware.protect,
  controllers.user.confirmEmailChange
);

export default router;
