// const UserFavoriteTruck = require("../models/UserFavoriteTruck");
// const TruckRating = require("../models/TruckRating");
// const addTruckRatings = require("../utils/addTruckRatings");
// const addMenuItems = require("../utils/addMenuItems");
// const FoodItem = require("../models/FoodItem");

import type { Request, Response } from "express";
import * as Truck from "../models/Truck";
import * as FoodItem from "../models/FoodItem";
import * as TruckRating from "../models/TruckRating";
import * as UserFavoriteTruck from "../models/UserFavoriteTruck";
import { ReqWithUser } from "~/types";
import addTruckRatings from "~/utils/addTruckRatings";
import addMenuItems from "~/utils/addMenuItems";
import { MenuItem } from "@prisma/client";

const addTruck = async (req: Request, res: Response) => {
  try {
    const truck = await Truck.insert((req as any).truckData);
    // const user_id = req.user ? req.user.id : null;
    // await addTruckRatings([truck], user_id);
    // await addMenuItems([truck]);
    return res.status(201).json(truck);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

const getTrucks = async (_: Request, res: Response) => {
  try {
    // const trucks = await Truck.fetchAll();
    // const user_id = req.user ? req.user.id : null;
    // await addTruckRatings(trucks, user_id);
    // await addMenuItems(trucks);

    return res.status(200).json((res as any).paginatedResults);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

const getTopTrucks = async (req: ReqWithUser, res: Response) => {
  try {
    const trucks = await Truck.fetchTop(+req.params.num);
    const user_id = req.user ? req.user.id : null;
    await addTruckRatings(trucks, user_id);
    // await addMenuItems(trucks);

    return res.status(200).json(trucks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error Fetching top trucks." });
  }
};

const getTopCuisines = async (req: Request, res: Response) => {
  try {
    const cuisines = await Truck.fetchTopCuisines(+req.params.num);

    return res.status(200).json(cuisines);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error Fetching top trucks." });
  }
};

const getTruckById = async (req: ReqWithUser, res: Response) => {
  console.log("🦩🦩 req.user::", req.user);
  try {
    const truck = req.truck ?? {} as any;
    truck.foodItems = await FoodItem.findAllByTruckId(truck.id);

    const reviews = (await TruckRating.findByTruckId(truck.id)).map((x) => x.rating);
    const average = Math.round(
      reviews.reduce((acc, c) => {
        return (acc += c);
      }, 0) / reviews.length
    );
    truck.averageRating = average;

    return res.status(200).json(truck);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

const addPageview = async (req: Request, res: Response) => {
  try {
    await Truck.addPageVisited(req.params.id);

    return res.status(200).json({
      message: "Success",
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

const editTruck = async (req: ReqWithUser, res: Response) => {
  try {
    if (req?.user?.id !== req.truck?.ownerId) {
      return res.status(403).json({ error: "Can not edit a truck not owned by you" });
    }
    const updatedTruck = await Truck.update(req.truck!.id, (req as any).truckData);
    await addTruckRatings([updatedTruck], req.user?.id);
    await addMenuItems([updatedTruck]);
    return res.status(200).json(updatedTruck);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

const deleteTruck = async (req: ReqWithUser, res: Response) => {
  try {
    if (req.user?.id !== req.truck?.ownerId) {
      return res.status(403).json({ error: "Can not delete a truck not owned by you" });
    }
    await Truck.remove(req.truck!.id);
    return res.status(200).json({ message: "Truck deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

const addFoodToTruck = async (req: ReqWithUser & { foodItem: MenuItem}, res: Response) => {
  try {
    const item = await FoodItem.insert(req!.foodItem);
    return res.status(201).json(item);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server mafunctioning" });
  }
};

const editFood = async (req: ReqWithUser & { foodItem: MenuItem, food?: { id?: string }}, res: Response) => {
  try {
    if (req.truck?.ownerId !== req.user!.id) {
      return res.status(400).json({ error: "Must be owner to delete food" });
    }
    await FoodItem.update(req.foodItem, req.food!.id);
    const food = await FoodItem.findById(req.food!.id);
    return res.status(200).json(food);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server mafunctioning" });
  }
};

const deleteFood = async (req: ReqWithUser & { food?: { id?: string }}, res: Response) => {
  try {
    if (req.truck?.ownerId !== req.user!.id) {
      return res.status(401).json({ error: "Must be owner to delete food" });
    }
    await FoodItem.remove(req.food!.id);

    return res.status(200).json({ message: "Menu Item Deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error removing menu item mafunctioning" });
  }
};

const addToFavorites = async (req: ReqWithUser, res: Response) => {
  const favorite = await UserFavoriteTruck.find(req.truck!.id, req!.user!.id);
  if (favorite) {
    return res.status(400).json({ error: "Truck already in favorites" });
  }
  await UserFavoriteTruck.insert(req.truck!.id, req.user!.id);

  return res.status(201).json({ message: "Added to favorites" });
};

const removeFromFavorites = async (req: ReqWithUser, res: Response) => {
  try {
    if (!req.truck) return res.status(400).json({ error: "Truck not found" });
    if (!req.user) return res.status(400).json({ error: "User not found" });
    const favorite = await UserFavoriteTruck.find(req.truck.id, req.user.id);
    if (!favorite) return res.status(400).json({ error: "Truck not in favorites" });
    await UserFavoriteTruck.remove(req.truck.id, req.user.id);
    return res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    
  }
};

const rateTruck = async (req: ReqWithUser, res: Response) => {
  try {
    if (!req.truck) return res.status(400).json({ error: "Truck not found" });
    if (!req.user) return res.status(400).json({ error: "User not found" });
    if (!req.body.rating) return res.status(400).json({ error: "Rating field required" });
    const alreadyFavorited = await TruckRating.find(req.user.id, req.truck.id);

    if (alreadyFavorited) {
      await TruckRating.update((req.param as any).ratingId, req.body!.rating);
    } else {
      await TruckRating.insert({ userId:req.user.id, truckId:req.truck.id, rating:req.body.rating});
    }

    return res.status(200).json({
      message: "Rating Added!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server mafunctioning" });
  }
};

const search = async (req: ReqWithUser, res: Response) => {
  try {
    // search using queries
    const trucks = await Truck.SearchByQuery(req.query);
    // add to results
    const user_id = req.user ? req.user.id : null;
    await addTruckRatings(trucks, user_id);
    await addMenuItems(trucks);
    // return search results
    return res.status(200).json(trucks);
  } catch (err) {
    console.log(err);
  }
};

export {
  addTruck,
  getTrucks,
  getTruckById,
  editTruck,
  deleteTruck,
  addToFavorites,
  removeFromFavorites,
  rateTruck,
  addFoodToTruck,
  deleteFood,
  editFood,
  addPageview,
  search,
  getTopTrucks,
  getTopCuisines,
};
