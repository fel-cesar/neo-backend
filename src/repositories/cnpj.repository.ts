import { PrismaClient } from "@prisma/client";
import { Cnpj } from "../entities/cnpj.entity";

export class CnpjRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(cnpj: string): Promise<Cnpj> {
    const newCnpj = await this.prisma.cnpj.create({ data: { value: cnpj } });
    return new Cnpj(newCnpj);
  }

  async getAll(): Promise<Cnpj[]> {
    const cnpjs = await this.prisma.cnpj.findMany();
    return cnpjs.map((cnpj) => new Cnpj(cnpj));
  }

  async findByValue(cnpj: string): Promise<Cnpj | null> {
    const found = await this.prisma.cnpj.findUnique({ where: { value: cnpj } });
    return found ? new Cnpj(found) : null;
  }

  async delete(cnpj: string): Promise<boolean> {
    await this.prisma.cnpj.delete({ where: { value: cnpj } });
    return true;
  }
}
