import { PrismaClient } from '@prisma/client'
import { singleton } from '../utils/singleton'

const prisma = singleton('prisma', () => new PrismaClient())
prisma.$connect()

export { prisma }
