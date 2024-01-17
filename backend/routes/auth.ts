import { Router } from "express";
import * as AuthController from "../controllers/Auth.controller.js";
import createUserRequirements from "../middleware/createUserRequirements.js";
import loginRequirements from "../middleware/loginRequirements.js";
import validateToken from "../middleware/validateToken.js";

const router = Router();

router.post("/register", [createUserRequirements], AuthController.register);
router.post("/login", [loginRequirements], AuthController.loginUser);
router.post("/logout", validateToken, AuthController.logout);
router.get("/me", validateToken, AuthController.me);

export default router;
