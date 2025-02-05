import { Cpf } from "../../src/entities/cpf.entity";

describe("Cpf Entity", () => {
  it("should create a valid CPF entity", () => {
    const cpf = new Cpf({ value: "12345678909" });
    expect(cpf.value).toBe("12345678909"); // Ensures CPF is formatted
  });

  it("should throw an error for an invalid CPF", () => {
    expect(() => new Cpf({ value: "11111111111" })).toThrow("Invalid CPF");
    expect(() => new Cpf({ value: "123" })).toThrow("Invalid CPF");
  });

  it("should convert CPF to JSON correctly", () => {
    const cpf = new Cpf({ value: "12345678909" });
    expect(cpf.toJSON()).toEqual({
      id: 0,
      value: "12345678909",
      blocked: false,
      createdAt: expect.any(Date),
    });
  });

  it("should create a CPF entity from JSON", () => {
    const json = {
      id: 1,
      value: "12345678909",
      blocked: true,
      createdAt: new Date(),
    };
    const cpf = Cpf.fromJSON(json);
    expect(cpf).toBeInstanceOf(Cpf);
    expect(cpf.value).toBe("12345678909");
  });
});
