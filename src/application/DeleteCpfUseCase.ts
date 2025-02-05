import { CpfRepository } from "../repositories/cpf.repository";

export class DeleteCpfUseCase {
  constructor(private cpfRepository: CpfRepository) {}

  async execute(cpfId: string): Promise<boolean> {
    const existing = await this.cpfRepository.findById(Number(cpfId));
    if (!existing) {
      throw new Error("CPF not found");
    }
    return this.cpfRepository.deleteById(Number(cpfId));
  }
}
