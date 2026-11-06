import "server-only";
import { PrismaClient } from "@/generated/database/client";
import { createDb } from "./create-db";

const processDatabaseCache = globalThis as typeof globalThis & {
  coursePortalDatabase?: PrismaClient;
};

export const database = processDatabaseCache.coursePortalDatabase ?? createDb();

if (process.env.NODE_ENV !== "production") {
  processDatabaseCache.coursePortalDatabase = database;
}
