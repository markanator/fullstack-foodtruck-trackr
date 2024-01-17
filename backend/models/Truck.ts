import { Prisma } from "@prisma/client";
import prisma from "../data/db.server.js";

export const insert = async (truckData: Prisma.TruckCreateArgs["data"]) => {
  return prisma.truck.create({
    data: truckData,
  });
};

export const findById = (id: string) => {
  return prisma.truck.findUnique({
    where: { id },
    include: {
      owner: {
        select: {
          avatar: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      photo: { select: { fileId: true, contentType: true } },
      reviews: {
        select: { rating: true },
      },
      _count: {
        select: {
          favorites: true,
          reviews: true,
        },
      },
    },
  });
};

export const fetchAll = (limit = 9) => {
  return prisma.truck.findMany({
    take: limit,
    orderBy: {
      name: "asc",
    },
    include: {
      photo: { select: { fileId: true, contentType: true } },
      reviews: {
        select: { rating: true },
      },
      _count: {
        select: {
          favorites: true,
          reviews: true,
        },
      },
    },
  });
};

export const fetchTop = (amount = 3) => {
  return prisma.truck.findMany({
    take: amount,
    orderBy: {
      views: "desc",
    },
    include: {
      photo: { select: { fileId: true, contentType: true } },
      reviews: {
        select: { rating: true },
      },
      _count: {
        select: {
          favorites: true,
          reviews: true,
        },
      },
    },
  });
};

export const remove = (id: string) => {
  return prisma.truck.delete({ where: { id } });
};

export const update = async (
  id: string,
  truckData: Prisma.TruckUpdateArgs["data"]
) => {
  return prisma.truck.update({
    where: { id },
    data: truckData,
  });
};

export const addPageVisited = async (truckID: string) => {
  const truck = await findById(truckID);
  if (!truck?.id) return false;
  prisma.truck.update({
    where: { id: truck.id },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  return true;
};

export const find = async ({ operator_id }: { operator_id: string }) => {
  return prisma.truck.findMany({
    where: {
      ownerId: operator_id,
    },
    include: {
      photo: { select: { fileId: true, contentType: true } },
      reviews: {
        select: { rating: true },
      },
      _count: {
        select: {
          favorites: true,
          reviews: true,
        },
      },
    },
  });
};

export const SearchByQuery = ({
  q = "",
  category = "",
  sortBy = "id",
  sortDir = "asc",
}) => {
  console.log("ATTEMPTING SEARCH");

  return prisma.truck.findMany({
    where: {
      ...(category ? { cuisineType: { contains: category } } : {}),
      ...(q ? { name: { contains: q } } : {}),
    },
    orderBy: {
      [sortBy]: sortDir,
    },
    include: {
      photo: { select: { fileId: true, contentType: true } },
      reviews: {
        select: { rating: true },
      },
      _count: {
        select: {
          favorites: true,
        },
      },
    },
  });
};

export const fetchTopCuisines = (amount = 3) => {
  return prisma.truck.groupBy({
    by: ["cuisineType"],
    _count: { cuisineType: true },
    orderBy: {
      _count: { cuisineType: "desc" },
    },
    take: amount,
  });
};
