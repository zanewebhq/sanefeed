import { Router } from 'express';
import controllers from '../controllers';
import middleware from '../middleware';

const router = Router();

router.post('/auth/signup', controllers.auth.signup);
router.post('/auth/login', controllers.auth.login);
router.get('/auth/logout', controllers.auth.logout);

router.post('/auth/verify', middleware.protect, controllers.auth.verify);
router.get(
  '/auth/resend-verification',
  middleware.protect,
  controllers.auth.resendVerification
);

router.post('/auth/recover', controllers.auth.recover);
router.post('/auth/recover/send', controllers.auth.sendRecovery);

export default router;
