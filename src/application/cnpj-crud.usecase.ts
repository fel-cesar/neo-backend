import { Cnpj } from "@prisma/client";
import { CnpjRepository } from "../repositories/cnpj.repository";
import { CNPJValidator } from "../entities/cnpj-validator";
import { CnpjJson } from "../entities/cnpj.entity";

export class CreateCnpjUseCase {
  constructor(private cnpjRepository: CnpjRepository) {}

  async execute(value: string): Promise<Cnpj> {
    const existingCnpj = await this.cnpjRepository.findByValue(value);

    if (existingCnpj) throw new Error("CNPJ already exists");
    if (!CNPJValidator.isValid(value)) throw new Error("Invalid CNPJ");

    return this.cnpjRepository.create(value);
  }
}

export class GetAllCnpjsUseCase {
  constructor(private cnpjRepository: CnpjRepository) {}

  async execute({
    query,
    blocked,
    ordering,
  }: {
    query?: string;
    blocked?: boolean;
    ordering?: "asc" | "desc";
  }): Promise<CnpjJson[]> {
    // TODO: Implement pagination
    return this.cnpjRepository.getAll({
      query,
      blocked,
      ordering,
    });
  }
}

export class DeleteCnpjUseCase {
  constructor(private cnpjRepository: CnpjRepository) {}

  async execute(id: string): Promise<boolean> {
    const existingCnpj = await this.cnpjRepository.findById(
      Number.parseInt(id)
    );
    if (!existingCnpj) throw new Error("CNPJ not found");

    return this.cnpjRepository.delete(Number.parseInt(id));
  }
}
