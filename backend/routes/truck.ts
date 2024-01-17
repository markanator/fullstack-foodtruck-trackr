import express from "express";
import * as TruckController from "../controllers/truckController.js";
import validateTruck from "../middleware/validateTruck.js";
import validateToken from "../middleware/validateToken.js";
import createTruckRequirements from "../middleware/createTruckRequirements.js";
import editTruckRequirements from "../middleware/editTruckRequirements.js";
import createMenuItemRequirements from "../middleware/createMenuItemRequirements.js";
import validateFood from "../middleware/validateFood.js";
import editFoodItemRequirements from "../middleware/editFoodItemRequirements.js";
import paginatedTruckResults from "../middleware/paginatedResults.js";

const router = express.Router();

router.get("/", paginatedTruckResults(), TruckController.getTrucks);
router.get("/top/:num", TruckController.getTopTrucks);
router.get("/top-cuisine/:num", TruckController.getTopCuisines);
router.get("/search", TruckController.search);
router.get("/:id", [validateTruck], TruckController.getTruckById);
router.get("/visited/:id", TruckController.addPageView);

router.use(validateToken);
//? Favorites
router.post("/favorites/:id", [validateTruck], TruckController.addToFavorites);
//? Remove from Favorites
router.delete(
  "/favorites/:id",
  [validateTruck],
  TruckController.removeFromFavorites
);
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
router.post(
  "/:id/food/",
  [validateTruck, createMenuItemRequirements],
  TruckController.addFoodToTruck
);
// ! EDIT MENU ITEM
router.put(
  "/food/:foodID",
  [validateFood, editFoodItemRequirements],
  TruckController.editFood
);
// ! DELETE MENU ITEM
router.delete("/food/:foodID", [validateFood], TruckController.deleteFood);

export default router;
