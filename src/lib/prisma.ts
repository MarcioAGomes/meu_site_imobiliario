import { PrismaClient } from '@prisma/client'

// Impede que múltiplas instâncias do Prisma Client sejam criadas em desenvolvimento
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma