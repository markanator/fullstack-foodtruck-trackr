const prisma = require("../data/db.server");

/**
 * finds a user by id
 * @param {string} id 
 * @returns {Promise<import(".prisma/client").User>} user
 */
const findById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

/**
 * finds a user by email
 * @param {string} email 
 * @returns {Promise<import(".prisma/client").User>} user
 */
const findByEmail = (email: string) => {
  console.log(prisma)
  return prisma.user.findUnique({ where: { email } });
};
/**
 * finds a user by username
 * @param {string} username 
 * @returns {Promise<import(".prisma/client").User>} user
 */
const findByUsername = (username: string) => {
  return prisma.user.findUnique({ where: { username } });
};
interface INewUser {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}
const insert = async ({ email, password, username, firstName, lastName, role }: INewUser) => {
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
  } catch (error) {
    console.log(error);
    return null
  }
};

const update = async (user: Omit<INewUser, 'password'|'role'>, id: string) => {
  return prisma.user.update({
    where: { id },
    data: user
  });
};

const remove = (id: string) => {
  return prisma.user.delete({
    where: { id }
  });
};

export {
  findById,
  findByEmail,
  findByUsername,
  insert,
  update,
  remove,
};
