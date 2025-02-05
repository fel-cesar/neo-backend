import { CpfRepository } from "../repositories/cpf.repository";

export class SwitchBlockCpfUseCase {
  constructor(private cpfRepository: CpfRepository) {}

  async execute(cpfId: number, blocked: boolean): Promise<boolean> {
    const updated = await this.cpfRepository.setBlockedById(cpfId, blocked);
    return updated.blocked;
  }
}
