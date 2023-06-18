import prisma from "~/data/db.server";

const find = (user_id: string, truck_id: string) => {
  return prisma.review.findFirst({
    where: { truckId: truck_id, userId: user_id }
  });
};

const findByTruckId = (truck_id: string) => {
  return prisma.review.findMany({
    where: { truckId: truck_id },
  });
};

const findRatingsByUserID = (user_id: string) => {
  return prisma.review.findMany({
    where: { userId: user_id },
  });
}

const insert = ({ rating, truckId, userId }: {truckId: string, userId: string, rating: number}) => {
  return prisma.review.create({
    data: {
      truckId,
      userId,
      rating,
    },
  });
};

const update = async (id: string, rating: number) => {
  return prisma.review.update({
    where: { id },
    data: {
      rating,
    },
  });
};

export {
  find,
  findByTruckId,
  insert,
  update,
  findRatingsByUserID,
};
