import { PrismaClient } from "../generated/prisma/client.js";
import dotenv from "dotenv"
dotenv.config()

const connectionString = `${process.env.DATABASE_URL}`;

const prisma = new PrismaClient();

export default prisma;