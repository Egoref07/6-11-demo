import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "database/schema.prisma",
  migrations: {
    path: "database/migrations",
    seed: "tsx scripts/seed-administrator.ts",
  },
  datasource: { url: process.env.DATABASE_URL },
});
