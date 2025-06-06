import { PrismaClient } from "@prisma/client";

const DbClient = globalThis.prisma || new PrismaClient();

// basically in the development environment
// avoid creating duplicate instances on every hot reload
// instead create the db instance once, store it globally and use that on successive requests.

if(process.env.NODE_ENV !== "production"){
    globalThis.prisma = DbClient;
}