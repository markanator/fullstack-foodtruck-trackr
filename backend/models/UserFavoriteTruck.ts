import prisma from "~/data/db.server";


const find = (truck_id: string, user_id: string) => {
  return prisma.favorite.findFirst({
    where: { truckId: truck_id, userId: user_id }
  })
};
const findAllByUserId = (user_id: string) => {
  return prisma.favorite.findMany({
    where: { userId: user_id },
    include: {
      truck: true,
    },
  });
};
const insert = async (truck_id: string, user_id: string) => {
  return prisma.favorite.create({
    data: {
      truckId: truck_id,
      userId: user_id,
    },
  });
};

const remove = async (truck_id: string, user_id: string) => {
  const fav = await prisma.favorite.findFirst({
    where: { truckId: truck_id, userId: user_id }
  });
  if (!fav) {
    throw new Error("Favorite not found");
  }
  return prisma.favorite.delete({
    where: { id: fav.id }
  })
};

export {
  insert,
  findAllByUserId,
  find,
  remove,
};
