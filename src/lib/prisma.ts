import { PrismaClient } from "@prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"

declare global {
  var prisma: PrismaClient | undefined
}

function createPrisma() {
  const factory = new PrismaLibSql({ url: "file:./prisma/dev.db" })
  return new PrismaClient({ adapter: factory } as any)
}

const prisma = global.prisma ?? createPrisma()

if (process.env.NODE_ENV !== "production") global.prisma = prisma

export default prisma
