import { Prisma } from "@prisma/client";

const prisma = require("../data/db.server");

const insert = async (truckData: Prisma.TruckCreateArgs['data']) => {
  return prisma.truck.create({
    data: truckData
  })
};

const findById = (id: string) => {
  return prisma.truck.findUnique({
    where: { id },
    include: {
      owner: {
        select: {
          avatar: true,
          firstName: true,
          lastName: true,
          email: true,
        }
      },
      photo: { select: { fileId: true, contentType: true } },
      reviews: {
        select: { rating: true }
      },
      _count: {
        select: {
          favorites: true,
          reviews: true,
        }
      }
    }
  });
};

const fetchAll = (limit = 9) => {
  return prisma.truck.findMany({
    take: limit,
    orderBy: {
      name: "asc"
    },
    include: {
      photo: { select: { fileId: true, contentType: true } },
      reviews: {
        select: { rating: true }
      },
      _count: {
        select: {
          favorites: true,
          reviews: true,
        }
      }
    }
  });
}

const fetchTop = (amount = 3) => {
  return prisma.truck.findMany({
    take: amount,
    orderBy: {
      views: "desc"
    },
    include: {
      photo: { select: { fileId: true, contentType: true } },
      reviews: {
        select: { rating: true }
      },
      _count: {
        select: {
          favorites: true,
          reviews: true,
        }
      }
    }
  });
}

const remove = (id: string) => {
  return prisma.truck.delete({ where: { id } });
};

const update = async (id: string, truckData: Prisma.TruckUpdateArgs['data']) => {
  return prisma.truck.update({
    where: { id },
    data: truckData,
  })
};

const addPageVisited = async (truckID: string) => {
  const { id } = await findById(truckID);
  if (!id) return false;
  prisma.truck.update({
    where: { id },
    data: {
      views: {
        increment: 1
      }
    },
  })

  return true;
}

const find = async ({ operator_id }: { operator_id: string }) => {
  return prisma.truck.findMany({
    where: {
      ownerId: operator_id
    },
    include: {
      photo: { select: { fileId: true, contentType: true } },
      reviews: {
        select: { rating: true }
      },
      _count: {
        select: {
          favorites: true,
          reviews: true,
        }
      }
    }
  })
}

const SearchByQuery = ({ q = "", category = "", sortBy = "id", sortDir = "asc" }) => {
  console.log("ATTEMPTING SEARCH");
  const whereClause = [
    category ? { cuisineType: { contains: category } } : undefined,
    q ? { name: { contains: q } } : undefined,
  ].filter(Boolean)
  return prisma.truck.findMany({
    where: {
      ...whereClause,
    },
    orderBy: {
      [sortBy]: sortDir
    },
    include: {
      photo: { select: { fileId: true, contentType: true } },
      reviews: {
        select: { rating: true }
      },
      _count: {
        select: {
          favorites: true,
        }
      }
    }
  })
};

const fetchTopCuisines = (amount = 3) => {
  return prisma.truck.groupBy({
    by: ["cuisineType"],
    _count: { cuisineType: true },
    orderBy: {
      _count: { cuisineType: "desc" }
    },
    take: amount,
  })
}


export {
  findById,
  SearchByQuery,
  update,
  insert,
  remove,
  fetchAll,
  find,
  addPageVisited,
  fetchTop,
  fetchTopCuisines,
}
