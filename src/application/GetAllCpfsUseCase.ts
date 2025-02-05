import { CpfJson } from "../entities/cpf";
import { CpfRepository } from "../repositories/cpf.repository";

export class GetAllCpfsUseCase {
  constructor(private cpfRepository: CpfRepository) {}

  async execute({
    query,
    blocked,
    ordering,
  }: {
    query?: string;
    blocked?: boolean;
    ordering?: "asc" | "desc";
  }): Promise<CpfJson[]> {
    // TODO: Implement pagination
    return this.cpfRepository.getAll({
      query,
      blocked,
      ordering,
    });
  }
}
