const prisma = require("../data/db.server");

/**
 * 
 * @param {import(".prisma/client").Prisma.TruckCreateArgs['data']} truckData 
 * @returns {Promise<import(".prisma/client").Truck>}
 */
const insert = async (truckData) => {
  return prisma.truck.create({
    data: truckData
  })
};

const findById = (id) => {
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

const remove = (id) => {
  return prisma.truck.delete({ where: { id } });
};

const update = async (id, truckData) => {
  return prisma.truck.update({
    where: { id },
    data: truckData,
  })
};

const addPageVisited = async (truckID) => {
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

const find = async ({ operator_id }) => {
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


module.exports = {
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
