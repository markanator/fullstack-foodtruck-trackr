const prisma = require("../data/db.server");

/**
 * finds a user by id
 * @param {string} id 
 * @returns {Promise<import(".prisma/client").User>} user
 */
const findById = (id) => {
  return prisma.user.findUnique({ where: { id } });
};

/**
 * finds a user by email
 * @param {string} email 
 * @returns {Promise<import(".prisma/client").User>} user
 */
const findByEmail = (email) => {
  console.log(prisma)
  return prisma.user.findUnique({ where: { email } });
};
/**
 * finds a user by username
 * @param {string} username 
 * @returns {Promise<import(".prisma/client").User>} user
 */
const findByUsername = (username) => {
  return prisma.user.findUnique({ where: { username } });
};
/**
 * Creates a new user
 * @param {import('.prisma/client').Prisma.UserCreateArgs['data']} userData 
 * @returns {Promise<import('.prisma/client').User>}
 */
const insert = async ({ email, password, username, firstName, lastName, role }) => {
  try {
    return prisma.user.create({
      data: {
        username,
        email,
        firstName,
        lastName,
        roles: {
          connect: {
            name: role
          }
        },
        password: {
          create: {
            hash: password
          }
        },
      }
    })
    return findById(id);
  } catch (error) {
    console.log(error);
    return null
  }
};

const update = async (user, id) => {
  return prisma.user.update({
    where: { id },
    data: user
  });
};

const remove = (id) => {
  return prisma.user.delete({
    where: { id }
  });
};

module.exports = {
  findById,
  findByEmail,
  findByUsername,
  insert,
  update,
  remove,
};
