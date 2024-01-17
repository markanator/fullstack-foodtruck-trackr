import { PrismaClient } from '@prisma/client'
// import {faker} from '@faker-js/faker'

const prisma = new PrismaClient

async function seed() {
  await prisma.menuItem.deleteMany();
  await prisma.truckStop.deleteMany();
  await prisma.truck.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.location.deleteMany();
  await prisma.key.deleteMany();
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