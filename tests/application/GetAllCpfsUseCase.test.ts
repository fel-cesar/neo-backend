import { GetAllCpfsUseCase } from "../../src/application/GetAllCpfsUseCase";
import { CpfRepository } from "../../src/repositories/cpf.repository";

describe("GetAllCpfsUseCase", () => {
  let mockRepository: jest.Mocked<CpfRepository>;
  let getAllCPFs: GetAllCpfsUseCase;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      getAll: jest.fn(),
      findByValue: jest.fn(),
      deleteById: jest.fn(),
      deleteByValue: jest.fn(),
      exists: jest.fn(),
    };

    getAllCPFs = new GetAllCpfsUseCase(mockRepository);
  });

  it("should return a list of CPFs", async () => {
    const createdDate1 = new Date();
    const createdDate2 = new Date();
    createdDate2.setDate(createdDate2.getDate() - 2);

    mockRepository.getAll.mockResolvedValue([
      { id: 1, value: "12345678901", blocked: false, createdAt: createdDate1 },
      { id: 2, value: "98765432100", blocked: true, createdAt: createdDate2 },
    ]);

    const result = await getAllCPFs.execute();

    expect(result).toHaveLength(2);
    expect(result[0].value).toBe("12345678901");
    expect(result[0].createdAt).toBe(createdDate1);
    expect(mockRepository.getAll).toHaveBeenCalled();
  });

  it("should return an empty list when no CPFs exist", async () => {
    mockRepository.getAll.mockResolvedValue([]);

    const result = await getAllCPFs.execute();

    expect(result).toEqual([]);
  });
});
