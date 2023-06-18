import { User } from "@prisma/client";
import * as Truck from "../models/Truck";

const addTotalTruckViews = async (
  user: User & { roles: { name: string }[] }
) => {
  if (user?.roles?.some((r) => r.name === "operator")) {
    const trucks = await Truck.find({ operator_id: user.id });

    const totalViews: number = trucks.reduce((acc: number, curr) => {
      return acc + (curr.views as unknown as number);
    }, 0);
    // @ts-ignore
    user.totalTruckViews = totalViews;
  }

  return user;
};
export default addTotalTruckViews;
