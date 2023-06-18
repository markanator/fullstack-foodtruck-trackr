import { Router } from "express";
import * as UserController from "../controllers/userController";
import validateToken from "../middleware/validateToken";
import editUserRequirements from "../middleware/editUserRequirements";

const router = Router();

router.use(validateToken);
router.get("/", UserController.getUser);
router.put("/", [editUserRequirements], UserController.editUser);
router.delete("/", UserController.deleteUser);

export default router;
