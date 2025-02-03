import { PrismaClient, User, Cpf } from "@prisma/client";

export const prisma = new PrismaClient();
// async function getUsers(): Promise<User[]> {
//   return await prisma.user.findMany();
// }
