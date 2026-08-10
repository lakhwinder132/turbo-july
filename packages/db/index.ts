import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prismaClient = new PrismaClient({ adapter });

// console.log("DB package sees:", process.env["DATABASE_URL"]);

export default prismaClient;