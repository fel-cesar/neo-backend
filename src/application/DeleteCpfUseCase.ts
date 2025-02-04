import { CpfRepository } from "../repositories/cpf.repository";

export class DeleteCpfUseCase {
  constructor(private cpfRepository: CpfRepository) {}

  async execute(cpfValue: string): Promise<boolean> {
    const existing = await this.cpfRepository.findByValue(cpfValue);

    if (!existing) {
      throw new Error("CPF not found");
    }

    return this.cpfRepository.deleteByValue(cpfValue);
  }
}
