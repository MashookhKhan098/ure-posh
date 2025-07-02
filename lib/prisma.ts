import { PrismaClient } from '@prisma/client'

// Prisma Client is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Clean up the Prisma Client when the process exits
process.on('SIGTERM', () => {
  prisma.$disconnect()
})

process.on('SIGINT', () => {
  prisma.$disconnect()
})

process.on('uncaughtException', () => {
  prisma.$disconnect()
})

process.on('unhandledRejection', () => {
  prisma.$disconnect()
})
