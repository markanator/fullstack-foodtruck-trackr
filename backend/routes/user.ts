import { Router } from "express";
import createUserRequirements from "~/middleware/createUserRequirements";
import loginRequirements from "~/middleware/loginRequirements";
import * as UserController from "~/controllers/userController"
import validateToken from "~/middleware/validateToken";
import editUserRequirements from "~/middleware/editUserRequirements";

const router = Router();

router.post("/", [createUserRequirements], UserController.registerUser);
router.post("/auth/login", [loginRequirements], UserController.loginUser);

router.use(validateToken);
router.get("/", UserController.getUser);
router.put("/", [editUserRequirements], UserController.editUser);
router.delete("/", UserController.deleteUser);

export default router;
