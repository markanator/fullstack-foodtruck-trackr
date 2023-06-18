import * as FoodItem from "../models/FoodItem";

const addMenuItems = async (trucks: { id: string }[]) => {
  for (let i = 0; i < trucks.length; i++) {
    // @ts-ignore
    trucks[i].foodItems = await FoodItem.findAllByTruckId(trucks[i].id);
  }
};
export default addMenuItems;
