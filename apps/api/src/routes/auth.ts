import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

router.post('/auth/signup', controllers.auth.signup);
router.post('/auth/login', controllers.auth.login);
router.get('/auth/logout', controllers.auth.logout);

export default router;
