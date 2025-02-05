import { PrismaClient } from "@prisma/client";
import { CpfJson } from "../entities/cpf.entity";

// TODO: create repository interface
// TODO: implement Data source pattern.
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
    return !!(await this._prisma.cpf.delete({ where: { id: id } }));
  }

  async findByValue(cpf: string) {
    return this._prisma.cpf.findUnique({ where: { value: cpf } });
  }

  async findById(id: number): Promise<CpfJson | null> {
    return this._prisma.cpf.findUnique({ where: { id: id } });
  }

  async exists(cpf: string) {
    return this._prisma.cpf.findFirst({ where: { value: cpf } });
  }

  async setBlockedById(id: number, blocked: boolean): Promise<CpfJson> {
    return this._prisma.cpf.update({
      where: { id: id },
      data: { blocked: blocked },
    });
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

    return this._prisma.cpf.findMany(queryArgs);
  }
}
