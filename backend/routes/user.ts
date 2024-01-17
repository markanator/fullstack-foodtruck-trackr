import { Router } from "express";
import * as UserController from "../controllers/userController.js";
import validateToken from "../middleware/validateToken.js";
import editUserRequirements from "../middleware/editUserRequirements.js";

const router = Router();

router.use(validateToken);
router.get("/", UserController.getUser);
router.put("/", [editUserRequirements], UserController.editUser);
router.delete("/", UserController.deleteUser);

export default router;
