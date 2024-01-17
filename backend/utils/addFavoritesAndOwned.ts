import type { User } from "@prisma/client";
import * as Truck from "../models/Truck.js";
import * as UserFavoriteTruck from "../models/UserFavoriteTruck.js";
import addMenuItems from "./addMenuItems.js";
import addTruckRatings from "./addTruckRatings.js";

const addFavoritesAndOwned = async (
  user: User & { roles: { name: string }[] }
) => {
  if (user.roles.some((r) => r.name === "operator")) {
    console.log("OPERATOR ASKING FOR SELF ITEMS");
    // @ts-ignore
    user.ownedTrucks = await Truck.find({ operator_id: user.id });
    // await addTruckRatings(user.ownedTrucks, user.id);
    // @ts-ignore
    await addMenuItems(user.ownedTrucks);
  }

  if (user.roles.some((r) => r.name === "user")) {
    const favorites = await UserFavoriteTruck.findAllByUserId(user.id);
    const promises = favorites.map((x) => Truck.findById(x.truckId));
    const returningTrucks = await Promise.all(promises);
    // @ts-ignore
    user.favoriteTrucks = returningTrucks;
    // @ts-ignore
    await addTruckRatings(user.favoriteTrucks, user.id);
    // await addMenuItems(user.favoriteTrucks);
  }
  return user;
};
export default addFavoritesAndOwned;
