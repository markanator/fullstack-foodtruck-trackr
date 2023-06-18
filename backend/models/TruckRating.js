// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const prisma = require("../data/db.server");

const find = (user_id, truck_id) => {
  return prisma.review.findFirst({
    where: { truckId: truck_id, userId: user_id }
  });
};

const findByTruckId = (truck_id) => {
  return prisma.review.findMany({
    where: { truckId: truck_id },
  });
};

const findRatingsByUserID = (user_id) => {
  return prisma.review.findMany({
    where: { userId: user_id },
  });
}

const insert = (truckId, userId, rating) => {
  return prisma.review.create({
    data: {
      truckId,
      userId,
      rating,
    },
  });
};

const update = async (user_id, truck_id, rating) => {
  return prisma.review.update({
    where: { truckId: truck_id, userId: user_id },
    data: {
      rating,
    },
  });
};

module.exports = {
  find,
  findByTruckId,
  insert,
  update,
  findRatingsByUserID,
};
