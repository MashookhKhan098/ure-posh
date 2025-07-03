import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// Add a global event listener to ensure the connection is properly closed
process.on('SIGTERM', () => {
  prisma.$disconnect().catch(() => null)
})

export default prisma
