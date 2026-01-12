import "dotenv/config";
import pg from "pg";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

console.log("DB FILE DATABASE_URL =", process.env.DATABASE_URL);

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });



