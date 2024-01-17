import { Router } from 'express';
import * as UserController from '../controllers/userController.js';

import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const router = Router();

router.get('/', ClerkExpressRequireAuth(), UserController.getUser);
// router.put('/', ClerkExpressRequireAuth(), [editUserRequirements], UserController.editUser);
// router.delete('/', ClerkExpressRequireAuth(), UserController.deleteUser);

export default router;
