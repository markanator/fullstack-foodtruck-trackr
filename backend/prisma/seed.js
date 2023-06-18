import { faker } from '@faker-js/faker'
import { prisma } from '~/utils/db.server.ts'

async function seed() { }

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })