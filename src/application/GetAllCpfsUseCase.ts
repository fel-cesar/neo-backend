import { CpfJson } from "../entities/cpf";
import { CpfRepository } from "../repositories/cpf.repository";

export class GetAllCpfsUseCase {
  constructor(private cpfRepository: CpfRepository) {}

  async execute(): Promise<CpfJson[]> {
    // TODO: Implement pagination
    // TODO: We can validate the data coming from the database too
    return this.cpfRepository.getAll();
  }
}