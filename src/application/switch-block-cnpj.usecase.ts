import { CnpjRepository } from "../repositories/cnpj.repository";

export class SwitchBlockCnpjUseCase {
  constructor(private cnpjRepository: CnpjRepository) {}

  async execute(cpfId: number, blocked: boolean): Promise<boolean> {
    const updated = await this.cnpjRepository.setBlockedById(cpfId, blocked);
    return updated.blocked;
  }
}
