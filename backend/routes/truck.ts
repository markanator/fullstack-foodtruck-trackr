import express from "express";
import * as TruckController from "../controllers/truckController";
import validateTruck from "../middleware/validateTruck";
import validateToken from "../middleware/validateToken";
import createTruckRequirements from "../middleware/createTruckRequirements";
import editTruckRequirements from "../middleware/editTruckRequirements";
import createMenuItemRequirements from "../middleware/createMenuItemRequirements";
import validateFood from "../middleware/validateFood";
import editFoodItemRequirements from "../middleware/editFoodItemRequirements";
import paginatedTruckResults from "../middleware/paginatedResults";

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
