// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const prisma = require("../data/db.server");

const find = (truck_id, user_id) => {
  return prisma.favorite.findFirst({
    where: { truckId: truck_id, userId: user_id }
  })
};
const findAllByUserId = (user_id) => {
  return prisma.favorite.findMany({
    where: { userId: user_id },
    include: {
      truck: true,
    },
  });
};
const insert = async (truck_id, user_id) => {
  return prisma.favorite.create({
    data: {
      truckId: truck_id,
      userId: user_id,
    },
  });
};

const remove = async (truck_id, user_id) => {
  const fav = await prisma.favorite.findFirst({
    where: { truckId: truck_id, userId: user_id }
  });
  return prisma.favorite.delete({
    where: { id: fav.id }
  })
};

module.exports = {
  insert,
  findAllByUserId,
  find,
  remove,
};
