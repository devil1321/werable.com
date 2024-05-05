import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const client = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma:PrismaClientSingleton = client.prisma ?? prismaClientSingleton()

export default prisma