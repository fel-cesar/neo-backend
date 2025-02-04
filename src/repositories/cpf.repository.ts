import { PrismaClient } from "@prisma/client";

export class CpfRepository {
  // TODO: Prisma repo. TODO: Implement the repository  interface and also do a PG repo/datasource

  readonly _prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this._prisma = prismaClient ?? new PrismaClient();
  }

  async create(cpf: string) {
    return this._prisma.cpf.create({ data: { value: cpf } });
  }

  async deleteByValue(cpf: string) {
    return !!(await this._prisma.cpf.delete({ where: { value: cpf } }));
  }
  async deleteById(id: number) {
    return this._prisma.cpf.delete({ where: { id: id } });
  }

  async findByValue(cpf: string) {
    return this._prisma.cpf.findUnique({ where: { value: cpf } });
  }

  async exists(cpf: string) {
    return this._prisma.cpf.findFirst({ where: { value: cpf } });
  }
  async getAll() {
    return this._prisma.cpf.findMany();
  }
}
