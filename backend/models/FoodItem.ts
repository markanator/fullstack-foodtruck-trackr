import type { Prisma } from "@prisma/client";
import prisma from "../lib/db.server.js";

export const findById = (id: string) => {
  return prisma.menuItem.findUnique({
    where: { id },
    include: {
      photo: { select: { fileId: true, contentType: true } },
    },
  });
};

export const findAllByTruckId = (truck_id: string) => {
  return prisma.menuItem.findMany({
    where: { truckId: truck_id },
    include: {
      photo: { select: { fileId: true, contentType: true } },
    },
  });
};

export const insert = async (food: Prisma.MenuItemCreateArgs["data"]) => {
  return prisma.menuItem.create({
    data: food,
  });
};
export const update = async (
  food: Prisma.MenuItemUpdateArgs["data"],
  id: string
) => {
  return prisma.menuItem.update({
    where: { id },
    data: food,
  });
};

export const remove = (id: string) => {
  return prisma.menuItem.delete({
    where: { id },
  });
};
