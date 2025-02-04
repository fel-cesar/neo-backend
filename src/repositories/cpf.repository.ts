import { PrismaClient } from "@prisma/client";

// TODO: Implement the repository  interface and also do a PG repo/datasource
const prisma = new PrismaClient();

export class CpfRepository {
  async create(cpf: string) {
    return prisma.cpf.create({ data: { value: cpf } });
  }

  async deleteByValue(cpf: string) {
    return !!(await prisma.cpf.delete({ where: { value: cpf } }));
  }
  async deleteById(id: number) {
    return prisma.cpf.delete({ where: { id: id } });
  }

  async findByValue(cpf: string) {
    return prisma.cpf.findUnique({ where: { value: cpf } });
  }

  async exists(cpf: string) {
    return prisma.cpf.findFirst({ where: { value: cpf } });
  }
  async getAll() {
    return prisma.cpf.findMany();
  }
}
