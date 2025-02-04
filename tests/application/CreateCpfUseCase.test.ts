import { CreateCpfUseCase } from "../../src/application/CreateCpfUseCase";
import { CpfRepository } from "../../src/repositories/cpf.repository";

describe("CreateCPFUseCase", () => {
  let mockRepository: jest.Mocked<CpfRepository>;
  let createCPF: CreateCpfUseCase;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      deleteByValue: jest.fn(),
      deleteById: jest.fn(),
      exists: jest.fn(),
      getAll: jest.fn(),
      findByValue: jest.fn(),
    };

    createCPF = new CreateCpfUseCase(mockRepository);
  });

  it("should create a CPF when it's valid and does not exist", async () => {
    mockRepository.findByValue.mockResolvedValue(null);

    const date = new Date();
    mockRepository.create.mockResolvedValue({
      id: 123,
      value: "12345678901",
      blocked: false,
      createdAt: date,
    });

    const result = await createCPF.execute("12345678901");

    expect(result).toEqual({
      id: 123,
      value: "12345678901",
      blocked: false,
      createdAt: date,
    });
    expect(mockRepository.create).toHaveBeenCalledWith("12345678901");
  });

  it("should throw an error if CPF already exists", async () => {
    const date = new Date();
    mockRepository.findByValue.mockResolvedValue({
      id: 123,
      value: "12345678901",
      blocked: true,
      createdAt: date,
    });

    await expect(createCPF.execute("12345678901")).rejects.toThrow(
      "CPF already exists"
    );
  });

  it("should throw an error for an invalid CPF", async () => {
    await expect(createCPF.execute("123")).rejects.toThrow("Invalid CPF");
  });
});
