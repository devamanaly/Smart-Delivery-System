import express, { Router } from 'express';
import registerMerchant from '../controllers/merchantController';
// import Login from '../controllers/authController';
import uploadFieldMiddleware from '../middleware/uploads';

const router: Router = express.Router();

router.post('/register-merchant', uploadFieldMiddleware, registerMerchant);
// router.post('/login', Login);

export default router;
