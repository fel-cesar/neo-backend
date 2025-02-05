import { CPFValidator } from "./cpf-validator";

export type CpfJson = {
  id: number;
  value: string;
  blocked: boolean;
  createdAt: Date;
};

export class Cpf {
  public readonly id: number;
  public readonly createdAt: Date;
  public readonly value: string;
  public readonly blocked: boolean = false;

  constructor({
    id,
    value,
    blocked = false,
    createdAt = new Date(),
  }: {
    id?: number;
    value: string;
    blocked?: boolean;
    createdAt?: Date;
  }) {
    this.id = id ?? 0;
    this.createdAt = createdAt ?? new Date();
    this.blocked = blocked;

    // Validate CPF before assigning value
    if (!CPFValidator.isValid(value)) {
      throw new Error("Invalid CPF");
    }

    this.value = value;
  }

  /**
   * @description Converts the CPF entity into a JSON object.
   * @returns {CpfJson} JSON representation of the CPF entity.
   */
  toJSON(): CpfJson {
    return {
      id: this.id,
      value: this.value,
      blocked: this.blocked,
      createdAt: this.createdAt,
    };
  }

  /**
   * @description Creates a `Cpf` entity from a JSON object.
   * @param {CpfJson} json - JSON representation of a CPF.
   * @returns {Cpf} New Cpf instance.
   */
  static fromJSON(json: CpfJson): Cpf {
    return new Cpf(json);
  }

  /**
   * @description Validates a CPF using the CPFValidator class.
   * @param {string} cpf - The CPF number.
   * @returns {boolean} True if the CPF is valid, false otherwise.
   */
  static isValid(cpf: string): boolean {
    return CPFValidator.isValid(cpf);
  }
}
