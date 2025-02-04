import { Cpf } from "../entities/cpf";
import { CpfRepository } from "../repositories/cpf.repository";

export class CreateCpfUseCase {
  constructor(private cpfRepository: CpfRepository) {}

  async execute(cpfValue: string) {
    const cpf = new Cpf({
      id: 0, // TODO: Not coming from database  we could have a separate validator, so we dont have to instantiate the Cpf
      value: cpfValue,
      createdAt: new Date(), // TODO: Not coming from database  we could have a separate validator, so we dont have to instantiate the Cpf
      blocked: false,
    });

    const existing = await this.cpfRepository.findByValue(cpf.value);

    if (existing) {
      throw new Error("CPF already exists");
    }

    return this.cpfRepository.create(cpf.value);
  }
}
