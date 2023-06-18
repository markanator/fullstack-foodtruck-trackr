const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient
// const prisma = require('../data/db.server')
const { faker } = require('@faker-js/faker')

async function seed() {
  await prisma.truck.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  const roles = ['user', 'operator', 'admin']
  await Promise.all(roles.map(role => prisma.role.create({ data: { name: role } })))

}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })