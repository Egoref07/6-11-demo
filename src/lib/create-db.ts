import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/database/client";


export function createDb(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("Добавь DATABASE_URL в .env");
  }
  const postgresAdapter = new PrismaPg({ connectionString: databaseUrl });
  return new PrismaClient({ adapter: postgresAdapter });
}
