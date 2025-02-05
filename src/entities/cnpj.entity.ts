import { CNPJValidator } from "./cnpj-validator";

export type CnpjJson = {
  id: number;
  value: string;
  blocked: boolean;
  createdAt: Date;
};

export class Cnpj {
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

    // Validate CNPJ before assigning value
    if (!CNPJValidator.isValid(value)) {
      throw new Error("Invalid CNPJ");
    }

    this.value = value // CNPJValidator.format(value);
  }

  /**
   * @description Converts the CNPJ entity into a JSON object.
   * @returns {CnpjJson} JSON representation of the CNPJ entity.
   */
  toJSON(): CnpjJson {
    return {
      id: this.id,
      value: this.value,
      blocked: this.blocked,
      createdAt: this.createdAt,
    };
  }

  /**
   * @description Creates a `Cnpj` entity from a JSON object.
   * @param {CnpjJson} json - JSON representation of a CNPJ.
   * @returns {Cnpj} New Cnpj instance.
   */
  static fromJSON(json: CnpjJson): Cnpj {
    return new Cnpj(json);
  }

  /**
   * @description Validates a CNPJ using the CNPJValidator class.
   * @param {string} cnpj - The CNPJ number.
   * @returns {boolean} True if the CNPJ is valid, false otherwise.
   */
  static isValid(cnpj: string): boolean {
    return CNPJValidator.isValid(cnpj);
  }
}
