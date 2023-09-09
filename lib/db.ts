import { PrismaClient } from "@prisma/client";

// Initializing Prisma Client 
declare global {
    var prisma: PrismaClient | undefined;
};

const prisma = new PrismaClient()
export const db = globalThis.prisma || prisma;

// this is done so that every time in non-prod env if we do some changes and test new prisma client is not created everytime. We append same client to global this. 
// Because at the time of hot reload after changes in code global this is not affected
if (process.env.NODE_ENV !== "production") globalThis.prisma = db







