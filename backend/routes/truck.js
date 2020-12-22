const express = require("express");
const TruckController = require("../controllers/truckController");
const validateTruck = require("../middleware/validateTruck");
const validateToken = require("../middleware/validateToken");
const createTruckRequirements = require("../middleware/createTruckRequirements");
const editTruckRequirements = require("../middleware/editTruckRequirements");
const createMenuItemRequirements = require("../middleware/createMenuItemRequirements");
const validateFood = require("../middleware/validateFood");
const editFoodItemRequirements = require("../middleware/editFoodItemRequirements");

const router = express.Router();

router.get("/", TruckController.getTrucks);
router.get("/:id", [validateTruck], TruckController.getTruckById);
router.get("/visited/:id", TruckController.addPageview);


router.use(validateToken);

//? Favorites
router.post("/favorites/:id", [validateTruck], TruckController.addToFavorites);
//? Remove from Favorites
router.delete("/favorites/:id",[validateTruck],TruckController.removeFromFavorites);
//? RATINGS
router.post("/ratings/:id", [validateTruck], TruckController.rateTruck);


//! create truck
router.post("/", [createTruckRequirements], TruckController.addTruck);
//! edit truck
router.put(
  "/:id",
  [validateTruck, editTruckRequirements],
  TruckController.editTruck
);
//! delete truck
router.delete("/:id", [validateTruck], TruckController.deleteTruck);

//! MENU ITEMS
router.post("/:id/food/",[validateTruck, createMenuItemRequirements],
TruckController.addFoodToTruck);
// ! EDIT MENU ITEM
router.put(
  "/food/:foodID",
  [validateFood, editFoodItemRequirements],
  TruckController.editFood
);
// ! DELETE MENU ITEM
router.delete("/food/:foodID", [validateFood], TruckController.deleteFood);




module.exports = router;
