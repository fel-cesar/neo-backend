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
    this.value = value;
    this.blocked = blocked;

    if (!Cpf.isValid(value)) {
      throw new Error("Invalid CPF");
    }
  }

  toJSON(): CpfJson {
    return {
      id: this.id,
      value: this.value,
      blocked: this.blocked,
      createdAt: this.createdAt,
    };
  }

  static fromJSON(json: CpfJson): Cpf {
    return new Cpf(json);
  }

  static isValid(cpf: string): boolean {
    return cpf.length === 11 && /^\d+$/.test(cpf); // Simple validation
  }
}
