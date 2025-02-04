import { Cpf } from "../entities/cpf";
import { CpfRepository } from "../repositories/cpf.repository";

export class CreateCpfUseCase {
  constructor(private cpfRepository: CpfRepository) {}

  async execute(cpfValue: string) {
    const isValid = Cpf.isValid(cpfValue); // TODO: create validator file or another approach
    if (!isValid) {
      throw new Error("Invalid CPF");
    }

    const existing = await this.cpfRepository.findByValue(cpfValue);
    if (existing) {
      throw new Error("CPF already exists");
    }

    return this.cpfRepository.create(cpfValue);
  }
}
