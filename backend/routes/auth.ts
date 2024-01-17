import { Router } from 'express';
import * as AuthController from '../controllers/Auth.controller.js';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const router = Router();

router.get('/me', ClerkExpressRequireAuth(), AuthController.me);

export default router;
