import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { CpfRepository } from "../../src/repositories/cpf.repository";
import { PrismaClient } from "@prisma/client";

export type Context = {
  prisma: PrismaClient;
};

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  };
};


describe("CpfRepository", () => {
  let mockCtx: MockContext;
  let ctx: Context;
  let cpfRepository: CpfRepository;

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    cpfRepository = new CpfRepository(ctx.prisma);
  });

  it("should create a CPF", async () => {
    (ctx.prisma.cpf.create as jest.Mock).mockResolvedValue({
      id: "1",
      value: "12345678901",
    });

    const result = await cpfRepository.create("12345678901");

    expect(result).toEqual({ id: "1", value: "12345678901" });
    expect(ctx.prisma.cpf.create as jest.Mock).toHaveBeenCalledWith({
      data: { value: "12345678901" },
    });
  });

  it("should find a CPF by value", async () => {
    (ctx.prisma.cpf.findUnique as jest.Mock).mockResolvedValue({
      id: "1",
      value: "12345678901",
    });

    const result = await cpfRepository.findByValue("12345678901");

    expect(result).toEqual({ id: "1", value: "12345678901" });
  });
});
