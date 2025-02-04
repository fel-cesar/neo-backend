import { DeleteCpfUseCase } from "../../src/application/DeleteCpfUseCase";
import { CpfRepository } from "../../src/repositories/cpf.repository";

describe("DeleteCpfUseCase", () => {
  let mockRepository: jest.Mocked<CpfRepository>;
  let deleteCPF: DeleteCpfUseCase;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      deleteByValue: jest.fn(),
      deleteById: jest.fn(),
      exists: jest.fn(),
      getAll: jest.fn(),
      findByValue: jest.fn(),
    };

    deleteCPF = new DeleteCpfUseCase(mockRepository);
  });

  it("should delete a CPF if it exists", async () => {
    mockRepository.findByValue.mockResolvedValue({
      id: 1,
      value: "12345678901",
      blocked: false,
      createdAt: new Date(),
    });

    mockRepository.deleteByValue.mockResolvedValue(true);
    mockRepository.deleteByValue.mockResolvedValue(true);

    const result = await deleteCPF.execute("12345678901");

    expect(result).toBe(true);
    expect(mockRepository.deleteByValue).toHaveBeenCalledWith("12345678901");
  });

  it("should throw an error if CPF does not exist", async () => {
    mockRepository.findByValue.mockResolvedValue(null);

    await expect(deleteCPF.execute("12345678901")).rejects.toThrow(
      "CPF not found"
    );
  });
});
