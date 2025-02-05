import { PrismaClient } from "@prisma/client";
import { DeleteCpfUseCase } from "../../src/application/DeleteCpfUseCase";
import { CpfRepository } from "../../src/repositories/cpf.repository";
import { mockDeep } from "jest-mock-extended";

describe("DeleteCpfUseCase", () => {
  let mockRepository: jest.Mocked<CpfRepository>;
  let deleteCPF: DeleteCpfUseCase;
  let mockPrisma: PrismaClient;

  beforeEach(() => {
    mockPrisma = mockDeep<PrismaClient>();

    mockRepository = {
      create: jest.fn(),
      deleteByValue: jest.fn(),
      deleteById: jest.fn(),
      exists: jest.fn(),
      getAll: jest.fn(),
      findByValue: jest.fn(),
      findById: jest.fn(),
      setBlockedById: jest.fn(),
      _prisma: mockPrisma,
    };

    deleteCPF = new DeleteCpfUseCase(mockRepository);
  });

  it("should delete a CPF if it exists", async () => {
    mockRepository.findById.mockResolvedValue({
      id: 1,
      value: "12345678901",
      blocked: false,
      createdAt: new Date(),
    });

    mockRepository.deleteById.mockResolvedValue(true);

    const result = await deleteCPF.execute("1");

    expect(result).toBe(true);
    expect(mockRepository.deleteById).toHaveBeenCalledWith(1);
  });

  it("should throw an error if CPF does not exist", async () => {
    mockRepository.findByValue.mockResolvedValue(null);

    await expect(deleteCPF.execute("12345678901")).rejects.toThrow(
      "CPF not found"
    );
  });
});
