import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

router.post('/signup', controllers.auth.signup);
router.post('/login', controllers.auth.login);

export default router;
