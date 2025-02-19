import { Router } from 'express';
import passport from 'passport';
import controllers from '../controllers';

const router = Router();

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  controllers.user.protectedRoute
);

export default router;
