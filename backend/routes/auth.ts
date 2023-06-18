import { Router } from "express";
import * as AuthController from "../controllers/Auth.controller";
import createUserRequirements from "../middleware/createUserRequirements";
import loginRequirements from "../middleware/loginRequirements";
import validateToken from "../middleware/validateToken";

const router = Router();

router.post("/register", [createUserRequirements], AuthController.register);
router.post("/login", [loginRequirements], AuthController.loginUser);
router.post("/logout", validateToken, AuthController.logout);
router.get("/me", validateToken, AuthController.me);

export default router;
