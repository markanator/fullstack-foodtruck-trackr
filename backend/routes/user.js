const express = require("express");
const UserController = require("../controllers/userController");
const createUserRequirements = require("../middleware/createUserRequirements");
const validateToken = require("../middleware/validateToken");
const loginRequirements = require("../middleware/loginRequirements");
const editUserRequirements = require("../middleware/editUserRequirements");

const router = express.Router();

router.post("/", [createUserRequirements], UserController.registerUser);
router.post("/auth/login", [loginRequirements], UserController.loginUser);

router.use(validateToken);
router.get("/", UserController.getUser);
router.put("/", [editUserRequirements], UserController.editUser);
router.delete("/", UserController.deleteUser);

module.exports = router;
