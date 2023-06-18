const prisma = require("../data/db.server");

const findById = (id) => {
  return prisma.menuItem.findUnique({
    where: { id },
    include: {
      photo: { select: { fileId: true, contentType: true } },
    },
  });
};

const findAllByTruckId = (truck_id) => {
  return prisma.menuItem.findMany({
    where: { truckId: truck_id },
    include: {
      photo: { select: { fileId: true, contentType: true } },
    },
  });
};

/**
 * 
 * @param {import('.prisma/client').Prisma.MenuItemCreateArgs['data']} food 
 * @returns 
 */
const insert = async (food) => {
  return prisma.menuItem.create({
    data: food,
  });
};
const update = async (food, id) => {
  return prisma.menuItem.update({
    where: { id },
    data: food,
  });
};

const remove = (id) => {
  return prisma.menuItem.delete({
    where: { id },
  });
};

module.exports = {
  findById,
  findAllByTruckId,
  insert,
  update,
  remove,
};
