import { PrismaClient } from "@prisma/client";
import { Cnpj, CnpjJson } from "../entities/cnpj.entity";

export class CnpjRepository {
  private prisma: PrismaClient;

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma ?? new PrismaClient();
  }

  async create(cnpj: string): Promise<Cnpj> {
    const newCnpj = await this.prisma.cnpj.create({ data: { value: cnpj } });
    return new Cnpj(newCnpj);
  }

  async getAll({
    query,
    blocked,
    ordering,
  }: {
    query?: string;
    blocked?: boolean;
    ordering?: "asc" | "desc";
  }) {
    const queryArgs = {
      orderBy: {
        id: ordering ?? "desc",
      },
      where: {},
    };

    if (query) {
      queryArgs.where = {
        ...queryArgs.where,
        value: {
          contains: query,
        },
      };
    }

    if (blocked !== undefined) {
      queryArgs.where = {
        ...queryArgs.where,
        blocked: blocked,
      };
    }

    return this.prisma.cnpj.findMany(queryArgs);
  }

  async findByValue(cnpj: string): Promise<CnpjJson | null> {
    const found = await this.prisma.cnpj.findUnique({ where: { value: cnpj } });
    return found;
  }
  async findById(id: number): Promise<CnpjJson | null> {
    const found = await this.prisma.cnpj.findUnique({ where: { id: id } });
    return found;
  }

  async setBlockedById(id: number, blocked: boolean): Promise<CnpjJson> {
    return this.prisma.cnpj.update({
      where: { id: id },
      data: { blocked: blocked },
    });
  }

  async delete(id: number): Promise<boolean> {
    await this.prisma.cnpj.delete({ where: { id: id } });
    return true;
  }
}
